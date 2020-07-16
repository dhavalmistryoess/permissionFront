import { TestBed } from '@angular/core/testing';

import { UserhistoryService } from './userhistory.service';

describe('UserhistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserhistoryService = TestBed.get(UserhistoryService);
    expect(service).toBeTruthy();
  });
});
