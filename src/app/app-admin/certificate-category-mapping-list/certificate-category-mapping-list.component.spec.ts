import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCategoryMappingListComponent } from './certificate-category-mapping-list.component';

describe('CertificateCategoryMappingListComponent', () => {
  let component: CertificateCategoryMappingListComponent;
  let fixture: ComponentFixture<CertificateCategoryMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateCategoryMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateCategoryMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
