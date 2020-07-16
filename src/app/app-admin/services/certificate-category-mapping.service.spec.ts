import { TestBed } from '@angular/core/testing';

import { CertificateCategoryMappingService } from './certificate-category-mapping.service';

describe('CertificateCategoryMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificateCategoryMappingService = TestBed.get(CertificateCategoryMappingService);
    expect(service).toBeTruthy();
  });
});
