import { async, TestBed } from '@angular/core/testing';
import { AssessmentResultComponent } from './assessment-result.component';
describe('AssessmentResultComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AssessmentResultComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AssessmentResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=assessment-result.component.spec.js.map