import { TestBed } from '@angular/core/testing';

import { AssessmentPanelService } from './assessment-panel.service';

describe('AssessmentPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentPanelService = TestBed.get(AssessmentPanelService);
    expect(service).toBeTruthy();
  });
});
