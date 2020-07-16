import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListDummyComponent } from './country-list-dummy.component';

describe('CountryListDummyComponent', () => {
  let component: CountryListDummyComponent;
  let fixture: ComponentFixture<CountryListDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryListDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
