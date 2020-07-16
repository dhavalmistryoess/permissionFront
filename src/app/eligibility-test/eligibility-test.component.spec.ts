import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityTestComponent } from './eligibility-test.component';

describe('EligibilityTestComponent', () => {
  let component: EligibilityTestComponent;
  let fixture: ComponentFixture<EligibilityTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
