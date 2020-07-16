import { TestBed } from '@angular/core/testing';

import { ProctorDashboardService } from './proctor-dashboard.service';

describe('ProctorDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProctorDashboardService = TestBed.get(ProctorDashboardService);
    expect(service).toBeTruthy();
  });
});
