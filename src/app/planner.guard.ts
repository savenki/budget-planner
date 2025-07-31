import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SavingLimitService } from './services/saving-limit.service';
import { Router } from '@angular/router';

export const plannerGuard: CanActivateFn = (route, state) => {
  const savingLimitService = inject(SavingLimitService);
  const router = inject(Router);

  const plannersValue = savingLimitService.planners(); // signal
  const timePeriods = savingLimitService.periods;      // assuming signal or value

  console.log('Guard check:', plannersValue, timePeriods);

  if (plannersValue.length && timePeriods.length) {
    return true;
  }

  // Redirect to home (/menu) if condition fails
  router.navigate(['/menu']);
  return false;
};
