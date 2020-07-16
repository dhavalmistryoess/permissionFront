import { async, TestBed } from '@angular/core/testing';
import { DiscountCouponListComponent } from './discount-coupon-list.component';
describe('DiscountCouponListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DiscountCouponListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DiscountCouponListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=discount-coupon-list.component.spec.js.map