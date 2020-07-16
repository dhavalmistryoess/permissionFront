import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCouponListComponent } from './discount-coupon-list.component';

describe('DiscountCouponListComponent', () => {
  let component: DiscountCouponListComponent;
  let fixture: ComponentFixture<DiscountCouponListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCouponListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCouponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
