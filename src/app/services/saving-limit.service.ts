import { computed, Injectable, signal } from '@angular/core';
import { Planner } from '../models/planners';
import { Segement } from '../models/segement';
import { Expenses } from '../models/expenses';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { TimePeriod } from '../models/timeperiod';

@Injectable({
  providedIn: 'root'
})
export class SavingLimitService {

  planners = signal<Planner[]>([]);
  expenses = signal<Expenses[]>([]);
  segements = signal<Segement[]>([]);
  enrichedSegments: any;
  segementsTotal: number = 0;
  periods: TimePeriod[] = [];
  constructor(private httpClient: HttpClient) { }

  addSegement(name: string, budget: Record<string, number>, time_period_id = 1) {
    const newSegment: Segement = {
      id: crypto.randomUUID(),
      name,
      budget,
      time_period_id
    };
    this.segements.update(prev => [...prev, newSegment]);
    console.log(this.segements(), "Segements after added")
  }

  caluclateSum() {
    this.enrichedSegments = computed(() =>
      this.segements().map(segment => {
        const entries = Object.entries(segment.budget).map(([key, value]) => ({
          key,
          value
        }));
        const total = entries.reduce((sum, entry) => sum + entry.value, 0);
        return {
          name: segment.name,
          entries,
          total,
          time_period_id: this.getTimePeriodById(segment.time_period_id)
        };
      })
    );

    console.log(this.enrichedSegments())
    this.segementsTotal = this.enrichedSegments().reduce((acc: any, curr: { [x: string]: any; }) => acc + curr['total'], 0);
  }

  getTimePeriods(): Observable<TimePeriod[]> {
    return this.httpClient.get<TimePeriod[]>("/budgetPlanner/timePeriod");
  }

  getPlanners(): Observable<Planner[]> {
    return this.httpClient.get<Planner[]>("budgetPlanner/planners");
  }

  getTimePeriodById(id: number) {
    console.log(id)
    console.log(this.periods)
    const match = this.periods.filter(period => period.id == id).map(period => ({ year: period.year, month: period.month }))[0];
    console.log(match)
    return match ? `${match.month} ${match.year}` : undefined;
  }

  loadEssentialObjectsFromServer() {
    forkJoin([this.getPlanners(), this.getTimePeriods()]).subscribe({
      next: ([plannersData, timePeriodData]) => {
        this.planners.update(() => plannersData.sort((a,b) => a.id - b.id));
        this.periods = timePeriodData.sort((a,b) => a.id - b.id);
      },
      error: err => console.log("Error in Forkjoin of Planners and periods", err)
    });
  }
}
