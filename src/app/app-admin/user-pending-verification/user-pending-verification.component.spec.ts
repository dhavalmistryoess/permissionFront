import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingVerificationComponent } from './user-pending-verification.component';

describe('UserPendingVerificationComponent', () => {
  let component: UserPendingVerificationComponent;
  let fixture: ComponentFixture<UserPendingVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPendingVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPendingVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
