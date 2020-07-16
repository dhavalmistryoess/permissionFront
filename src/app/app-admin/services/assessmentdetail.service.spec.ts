import { TestBed } from '@angular/core/testing';

import { AssessmentdetailService } from './assessmentdetail.service';

describe('AssessmentdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentdetailService = TestBed.get(AssessmentdetailService);
    expect(service).toBeTruthy();
  });
});
