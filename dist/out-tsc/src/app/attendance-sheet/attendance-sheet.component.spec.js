import { async, TestBed } from '@angular/core/testing';
import { AttendanceSheetComponent } from './attendance-sheet.component';
describe('AttendanceSheetComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AttendanceSheetComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AttendanceSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=attendance-sheet.component.spec.js.map