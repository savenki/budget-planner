import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { plannerGuard } from './planner.guard';

describe('plannerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => plannerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
