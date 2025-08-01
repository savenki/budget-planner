import { Component, OnInit } from '@angular/core';
import { SavingLimitService } from './services/saving-limit.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  
  title = 'budget-planner';
  constructor(private savingLimitService: SavingLimitService, private swUpdate: SwUpdate){}
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
        this.swUpdate.versionUpdates.subscribe(() => {
          if(confirm("You're using an old version of the Budget Planner. Want to update?")) {
            window.location.reload();
          }
        });
      }
    this.savingLimitService.loadEssentialObjectsFromServer();
  }
}
