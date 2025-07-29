import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Segement } from '../models/segement';
import { Expenses } from '../models/expenses';

@Injectable({
  providedIn: 'root'
})
export class SavingLimitService {

  users = signal<User[]>([{id: 0, name: "Kavya"}, {id: 1, name: "Venky"}]);
  expenses = signal<Expenses[]>([]);
  segements = signal<Segement[]>([]);
  enrichedSegments: any;
  segementsTotal: number = 0;
  constructor() { }

  addSegement(name:string, budget: Record<string, number>){
    const newSegment: Segement = {
      id: crypto.randomUUID(),
      name,
      budget,
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
          total
        };
      })
    )
    this.segementsTotal = this.enrichedSegments().reduce((acc: any, curr: { [x: string]: any; }) => acc + curr['total'], 0);
  }
}
