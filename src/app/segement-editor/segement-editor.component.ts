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

  constructor(
    private fb: FormBuilder,
    public savingLimitService: SavingLimitService
  ) {
    this.segmentForm = this.fb.group({
      segments: this.fb.array([
        this.createSegment()
      ])
    });
  }
  ngOnInit(): void {
  }

  get segments(): FormArray {
    return this.segmentForm.get('segments') as FormArray;
  }

  createSegment(): FormGroup {
    const budgetGroup = this.fb.group({});
    this.savingLimitService.planners().forEach(user => {
      budgetGroup.addControl(user.id.toString(), this.fb.control(0, Validators.required));
    });

    return this.fb.group({
      name: ['', Validators.required],
      budget: budgetGroup,
      time_period_id: [this.savingLimitService.periods[0]?.id ?? '', Validators.required],
    });
  }

  onSubmit(): void {
  // Ensure all fields are marked touched for validation
  this.segmentForm.markAllAsTouched();

  console.log("Form Status:", this.segmentForm.status);
  if (!this.segmentForm.valid) {
    alert("Please fill in all required details correctly!");
    return;
  }

  this.segments.controls.forEach(segmentGroup => {
    const name = segmentGroup.get('name')?.value;
    const time_period_id = segmentGroup.get('time_period_id')?.value;
    const rawBudget = segmentGroup.get('budget')?.value;

    // ✅ Validate critical values before proceeding
    const isNameValid = typeof name === 'string' && name.trim().length > 0;
    const isPeriodValid = time_period_id && time_period_id > 0;
    const isBudgetValid = rawBudget && Object.values(rawBudget).every(val => typeof val === 'number' && val >= 0);

    if (isNameValid && isPeriodValid && isBudgetValid) {
      const budget: Record<string, number> = {};
      this.savingLimitService.planners().forEach(user => {
        const userId = user.id.toString();
        budget[userId] = rawBudget[userId];
      });

      console.log("✅ Adding Segment:", { name, budget, time_period_id });
      this.savingLimitService.addSegement(name, budget, time_period_id);
    } else {
      console.warn("🚫 Skipping invalid segment:", { name, time_period_id, rawBudget });
    }
  });

  this.showSuccess = true;

  // Slight delay to ensure change detection stabilizes before reset
  setTimeout(() => {
    this.segmentForm.reset();
    this.segmentForm.setControl('segments', this.fb.array([this.createSegment()]));
  }, 100);
}
}
