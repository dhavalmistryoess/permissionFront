import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullexaminationsheetComponent } from './fullexaminationsheet.component';

describe('FullexaminationsheetComponent', () => {
  let component: FullexaminationsheetComponent;
  let fixture: ComponentFixture<FullexaminationsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullexaminationsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullexaminationsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
