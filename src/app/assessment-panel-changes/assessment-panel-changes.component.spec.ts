import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPanelChangesComponent } from './assessment-panel-changes.component';

describe('AssessmentPanelChangesComponent', () => {
  let component: AssessmentPanelChangesComponent;
  let fixture: ComponentFixture<AssessmentPanelChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPanelChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPanelChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
