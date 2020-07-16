import { TestBed, inject } from '@angular/core/testing';
import { HttpInterceptorClassService } from './http-interceptor-class.service';
describe('HttpInterceptorClassService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [HttpInterceptorClassService]
        });
    });
    it('should be created', inject([HttpInterceptorClassService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=http-interceptor-class.service.spec.js.map