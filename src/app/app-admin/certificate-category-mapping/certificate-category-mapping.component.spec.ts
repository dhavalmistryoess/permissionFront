import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCategoryMappingComponent } from './certificate-category-mapping.component';

describe('CertificateCategoryMappingComponent', () => {
  let component: CertificateCategoryMappingComponent;
  let fixture: ComponentFixture<CertificateCategoryMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateCategoryMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateCategoryMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
