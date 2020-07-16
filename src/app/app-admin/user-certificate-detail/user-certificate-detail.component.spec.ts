import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificateDetailComponent } from './user-certificate-detail.component';

describe('UserCertificateDetailComponent', () => {
  let component: UserCertificateDetailComponent;
  let fixture: ComponentFixture<UserCertificateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
