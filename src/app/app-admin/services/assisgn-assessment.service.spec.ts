import { TestBed } from '@angular/core/testing';

import { AssisgnAssessmentService } from './assisgn-assessment.service';

describe('AssisgnAssessmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssisgnAssessmentService = TestBed.get(AssisgnAssessmentService);
    expect(service).toBeTruthy();
  });
});
