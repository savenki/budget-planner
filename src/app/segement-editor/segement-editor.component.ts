import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SavingLimitService } from '../services/saving-limit.service';

@Component({
  selector: 'app-segement-editor',
  templateUrl: './segement-editor.component.html',
  styleUrls: ['./segement-editor.component.sass']
})
export class SegementEditorComponent {
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
      budget: budgetGroup
    });
  }

  onSubmit() {
    if (this.segmentForm.valid) {
      this.segments.controls.forEach(segmentGroup => {
        const name = segmentGroup.get('name')?.value;
        const rawBudget = segmentGroup.get('budget')?.value;

        const budget: Record<string, number> = {};
        this.savingLimitService.users().forEach(user => {
          budget[user.id.toString()] = rawBudget[user.name];
        });

        this.savingLimitService.addSegement(name, budget);
      });

      this.showSuccess = true;
      this.segmentForm.reset();

      // Optionally reinitialize the form with one empty segment
      this.segmentForm.setControl('segments', this.fb.array([this.createSegment()]));
    }
  }
}
