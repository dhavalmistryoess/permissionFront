import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityItemListComponent } from './eligibility-item-list.component';

describe('EligibilityItemListComponent', () => {
  let component: EligibilityItemListComponent;
  let fixture: ComponentFixture<EligibilityItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
