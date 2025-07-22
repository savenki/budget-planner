import { Component } from '@angular/core';
import { SavingLimitService } from '../services/saving-limit.service';

@Component({
  selector: 'app-segement-view',
  templateUrl: './segement-view.component.html',
  styleUrls: ['./segement-view.component.sass']
})
export class SegementViewComponent {

  constructor(public savingLimitService: SavingLimitService){}
}
