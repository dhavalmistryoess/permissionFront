import { async, TestBed } from '@angular/core/testing';
import { EligibilityTestComponent } from './eligibility-test.component';
describe('EligibilityTestComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EligibilityTestComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EligibilityTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=eligibility-test.component.spec.js.map