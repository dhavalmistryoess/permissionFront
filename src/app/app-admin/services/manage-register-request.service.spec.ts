import { TestBed } from '@angular/core/testing';

import { ManageRegisterRequestService } from './manage-register-request.service';

describe('ManageRegisterRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageRegisterRequestService = TestBed.get(ManageRegisterRequestService);
    expect(service).toBeTruthy();
  });
});
