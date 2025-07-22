import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegementEditorComponent } from './segement-editor.component';

describe('SegementEditorComponent', () => {
  let component: SegementEditorComponent;
  let fixture: ComponentFixture<SegementEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegementEditorComponent]
    });
    fixture = TestBed.createComponent(SegementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
