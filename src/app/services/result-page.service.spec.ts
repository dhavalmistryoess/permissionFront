import { TestBed } from '@angular/core/testing';

import { ResultPageService } from './result-page.service';

describe('ResultPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultPageService = TestBed.get(ResultPageService);
    expect(service).toBeTruthy();
  });
});
