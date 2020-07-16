import { TestBed } from '@angular/core/testing';

import { DiscountCouponService } from './discount-coupon.service';

describe('DiscountCouponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountCouponService = TestBed.get(DiscountCouponService);
    expect(service).toBeTruthy();
  });
});
