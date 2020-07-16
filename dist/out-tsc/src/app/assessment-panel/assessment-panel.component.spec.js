import { async, TestBed } from '@angular/core/testing';
import { AssessmentPanelComponent } from './assessment-panel.component';
describe('AssessmentPanelComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AssessmentPanelComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AssessmentPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=assessment-panel.component.spec.js.map