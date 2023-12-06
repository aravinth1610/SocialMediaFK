import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { signupCanDeactivateGuard } from './signup-can-deactivate.guard';

describe('signupCanDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signupCanDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
