import { async, TestBed } from '@angular/core/testing';
import { CountryListDummyComponent } from './country-list-dummy.component';
describe('CountryListDummyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CountryListDummyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CountryListDummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=country-list-dummy.component.spec.js.map