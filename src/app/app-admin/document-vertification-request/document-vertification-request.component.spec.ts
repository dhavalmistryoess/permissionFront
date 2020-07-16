import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVertificationRequestComponent } from './document-vertification-request.component';

describe('DocumentVertificationRequestComponent', () => {
  let component: DocumentVertificationRequestComponent;
  let fixture: ComponentFixture<DocumentVertificationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentVertificationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentVertificationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
