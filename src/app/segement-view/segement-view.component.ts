import { Component, OnInit } from '@angular/core';
import { SavingLimitService } from '../services/saving-limit.service';

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
}
