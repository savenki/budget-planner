import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegementViewComponent } from './segement-view.component';

describe('SegementViewComponent', () => {
  let component: SegementViewComponent;
  let fixture: ComponentFixture<SegementViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegementViewComponent]
    });
    fixture = TestBed.createComponent(SegementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
