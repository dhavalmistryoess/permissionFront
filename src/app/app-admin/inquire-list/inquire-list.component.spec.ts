import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquireListComponent } from './inquire-list.component';

describe('InquireListComponent', () => {
  let component: InquireListComponent;
  let fixture: ComponentFixture<InquireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
