import { TestBed } from '@angular/core/testing';

import { EligibilityTestService } from './eligibility-test.service';

describe('EligibilityTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EligibilityTestService = TestBed.get(EligibilityTestService);
    expect(service).toBeTruthy();
  });
});
