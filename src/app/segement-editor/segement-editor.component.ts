import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SavingLimitService } from '../services/saving-limit.service';
import { TimePeriod } from '../models/timeperiod';

@Component({
  selector: 'app-segement-editor',
  templateUrl: './segement-editor.component.html',
  styleUrls: ['./segement-editor.component.sass']
})
export class SegementEditorComponent implements OnInit {
  segmentForm: FormGroup;
  showSuccess: boolean = false;
  periods: TimePeriod[] = [];

  constructor(
    private fb: FormBuilder,
    public savingLimitService: SavingLimitService
  ) {
    this.segmentForm = this.fb.group({
      segments: this.fb.array([
        this.createSegment()
      ])
    });
    console.log(this.segmentForm)
  }
  ngOnInit(): void {
    this.savingLimitService.getTimePeriods().subscribe({
      next: data => this.periods = data,
      error:err => console.log("Error in periods", err)
    });
  }

  get segments(): FormArray {
    return this.segmentForm.get('segments') as FormArray;
  }

  createSegment(): FormGroup {
    const budgetGroup = this.fb.group({});
    this.savingLimitService.users().forEach(user => {
      budgetGroup.addControl(user.name, this.fb.control(0, Validators.required));
    });

    return this.fb.group({
      name: ['', Validators.required],
      budget: budgetGroup,
      time_period_id: [0, Validators.required],
    });
  }

  onSubmit() {
    if (this.segmentForm.valid) {
      this.segments.controls.forEach(segmentGroup => {
        const name = segmentGroup.get('name')?.value;
        const rawBudget = segmentGroup.get('budget')?.value;
        const time_period_id = segmentGroup.get('time_period_id')?.value;
        const budget: Record<string, number> = {};
        this.savingLimitService.users().forEach(user => {
          budget[user.id.toString()] = rawBudget[user.name];
        });

        this.savingLimitService.addSegement(name, budget,time_period_id);
      });

      this.showSuccess = true;
      this.segmentForm.reset();

      // Optionally reinitialize the form with one empty segment
      this.segmentForm.setControl('segments', this.fb.array([this.createSegment()]));
    }
  }
}
