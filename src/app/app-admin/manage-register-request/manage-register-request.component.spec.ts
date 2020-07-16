import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegisterRequestComponent } from './manage-register-request.component';

describe('ManageRegisterRequestComponent', () => {
  let component: ManageRegisterRequestComponent;
  let fixture: ComponentFixture<ManageRegisterRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRegisterRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegisterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
