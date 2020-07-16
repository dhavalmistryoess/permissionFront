import { TestBed } from '@angular/core/testing';

import { EligibilityItemService } from './eligibility-item.service';

describe('EligibilityItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EligibilityItemService = TestBed.get(EligibilityItemService);
    expect(service).toBeTruthy();
  });
});
