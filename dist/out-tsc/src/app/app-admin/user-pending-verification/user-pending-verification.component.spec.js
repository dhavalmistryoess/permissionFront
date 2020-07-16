import { async, TestBed } from '@angular/core/testing';
import { UserPendingVerificationComponent } from './user-pending-verification.component';
describe('UserPendingVerificationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UserPendingVerificationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UserPendingVerificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-pending-verification.component.spec.js.map