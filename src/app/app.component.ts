import { Component, OnInit } from '@angular/core';
import { SavingLimitService } from './services/saving-limit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  
  title = 'budget-planner';
  constructor(private savingLimitService: SavingLimitService){}
  ngOnInit(): void {
    this.savingLimitService.loadEssentialObjectsFromServer();
  }
}
