import { Injectable, signal } from '@angular/core';
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
  constructor() { }

  addSegement(name:string, budget: Record<string, number>){
    const newSegment: Segement = {
      id: crypto.randomUUID(),
      name,
      budget,
    };
    this.segements.update(prev => [...prev, newSegment]);
  }
}
