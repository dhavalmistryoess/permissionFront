import { async, TestBed } from '@angular/core/testing';
import { EligibilityItemListComponent } from './eligibility-item-list.component';
describe('EligibilityItemListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EligibilityItemListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EligibilityItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=eligibility-item-list.component.spec.js.map