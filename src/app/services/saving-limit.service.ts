import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Segement } from '../models/segement';
import { Expenses } from '../models/expenses';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimePeriod } from '../models/timeperiod';

@Injectable({
  providedIn: 'root'
})
export class SavingLimitService {

  users = signal<User[]>([{ id: 0, name: "Kavya" }, { id: 1, name: "Venky" }]);
  expenses = signal<Expenses[]>([]);
  segements = signal<Segement[]>([]);
  enrichedSegments: any;
  segementsTotal: number = 0;
  periods: TimePeriod[] = [];
  constructor(private httpClient: HttpClient) {
    this.getTimePeriods().subscribe({
      next: data => this.periods = data,
      error: err => console.log("Error in periods", err)
    })
  }

  addSegement(name: string, budget: Record<string, number>, time_period_id = 1) {
    const newSegment: Segement = {
      id: crypto.randomUUID(),
      name,
      budget,
      time_period_id
    };
    this.segements.update(prev => [...prev, newSegment]);
  }

  caluclateSum() {
    this.enrichedSegments = computed(() =>
      this.segements().map(segment => {
        const entries = Object.entries(segment.budget);
        const total = entries.reduce((sum, [, amount]) => sum + amount, 0);
        return {
          name: segment.name,
          entries,
          total,
          time_period_id: this.getTimePeriodById(segment.time_period_id)
        };
      })
    )
    this.segementsTotal = this.enrichedSegments().reduce((acc: any, curr: { [x: string]: any; }) => acc + curr['total'], 0);
  }

  getTimePeriods(): Observable<TimePeriod[]> {
    return this.httpClient.get<TimePeriod[]>("/budgetPlanner/timePeriod");
  }
  getTimePeriodById(id: number) {
    console.log(id)
    console.log(this.periods)
    const match = this.periods.filter(period => period.id == id).map(period => ({ year: period.year, month: period.month }))[0];
    console.log(match)
    return match ? `${match.month} ${match.year}` : undefined;
  }

}
