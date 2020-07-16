import { TestBed } from '@angular/core/testing';
import { UserInviteService } from './user-invite.service';
describe('UserInviteService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(UserInviteService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user-invite.service.spec.js.map