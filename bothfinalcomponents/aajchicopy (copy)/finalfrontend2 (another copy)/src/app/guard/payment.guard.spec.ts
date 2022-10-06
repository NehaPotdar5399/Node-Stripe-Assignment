import { TestBed } from '@angular/core/testing';

import { PaymentGuard } from './payment.guard';

describe('PaymentGuard', () => {
  let guard: PaymentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
