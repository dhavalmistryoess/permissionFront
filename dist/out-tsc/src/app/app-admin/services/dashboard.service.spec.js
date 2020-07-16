import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
describe('DashboardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DashboardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard.service.spec.js.map