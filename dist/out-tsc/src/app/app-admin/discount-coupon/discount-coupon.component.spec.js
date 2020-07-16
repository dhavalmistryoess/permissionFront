import { async, TestBed } from '@angular/core/testing';
import { DiscountCouponComponent } from './discount-coupon.component';
describe('DiscountCouponComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DiscountCouponComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DiscountCouponComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=discount-coupon.component.spec.js.map