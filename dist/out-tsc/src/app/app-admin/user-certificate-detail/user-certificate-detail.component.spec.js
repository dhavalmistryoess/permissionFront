import { async, TestBed } from '@angular/core/testing';
import { UserCertificateDetailComponent } from './user-certificate-detail.component';
describe('UserCertificateDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UserCertificateDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UserCertificateDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-certificate-detail.component.spec.js.map