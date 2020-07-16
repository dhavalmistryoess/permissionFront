import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPanelComponent } from './assessment-panel.component';

describe('AssessmentPanelComponent', () => {
  let component: AssessmentPanelComponent;
  let fixture: ComponentFixture<AssessmentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
