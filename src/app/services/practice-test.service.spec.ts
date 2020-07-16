import { TestBed } from '@angular/core/testing';

import { PracticeTestService } from './practice-test.service';

describe('PracticeTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PracticeTestService = TestBed.get(PracticeTestService);
    expect(service).toBeTruthy();
  });
});
