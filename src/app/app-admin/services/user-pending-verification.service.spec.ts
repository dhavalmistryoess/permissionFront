import { TestBed } from '@angular/core/testing';

import { UserPendingVerificationService } from './user-pending-verification.service';

describe('UserPendingVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPendingVerificationService = TestBed.get(UserPendingVerificationService);
    expect(service).toBeTruthy();
  });
});
