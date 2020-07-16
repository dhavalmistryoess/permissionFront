import { async, TestBed } from '@angular/core/testing';
import { CertificateCategoryMappingListComponent } from './certificate-category-mapping-list.component';
describe('CertificateCategoryMappingListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CertificateCategoryMappingListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CertificateCategoryMappingListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=certificate-category-mapping-list.component.spec.js.map