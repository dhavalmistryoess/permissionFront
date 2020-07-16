import { async, TestBed } from '@angular/core/testing';
import { CertificateCategoryMappingComponent } from './certificate-category-mapping.component';
describe('CertificateCategoryMappingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CertificateCategoryMappingComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CertificateCategoryMappingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=certificate-category-mapping.component.spec.js.map