import { Component, OnInit } from '@angular/core';
import { SavingLimitService } from '../services/saving-limit.service';
import { TimePeriod } from '../models/timeperiod';

@Component({
  selector: 'app-segement-view',
  templateUrl: './segement-view.component.html',
  styleUrls: ['./segement-view.component.sass']
})
export class SegementViewComponent implements OnInit {
  constructor(public savingLimitService: SavingLimitService) { }
  ngOnInit(): void {
    this.savingLimitService.caluclateSum();
  }

  getBudgetValue(entries: { key: string, value: number }[], userId: string | number): number {
  const entry = entries.find(e => e.key == userId);
  return entry ? entry.value : 0;
}
}
