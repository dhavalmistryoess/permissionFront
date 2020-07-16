import { async, TestBed } from '@angular/core/testing';
import { FullexaminationsheetComponent } from './fullexaminationsheet.component';
describe('FullexaminationsheetComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FullexaminationsheetComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FullexaminationsheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=fullexaminationsheet.component.spec.js.map