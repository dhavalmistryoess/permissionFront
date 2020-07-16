import { async, TestBed } from '@angular/core/testing';
import { DocumentVertificationRequestComponent } from './document-vertification-request.component';
describe('DocumentVertificationRequestComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DocumentVertificationRequestComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DocumentVertificationRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=document-vertification-request.component.spec.js.map