import { async, TestBed } from '@angular/core/testing';
import { ManageRegisterRequestComponent } from './manage-register-request.component';
describe('ManageRegisterRequestComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ManageRegisterRequestComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ManageRegisterRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=manage-register-request.component.spec.js.map