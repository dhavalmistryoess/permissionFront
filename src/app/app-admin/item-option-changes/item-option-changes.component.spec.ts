import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOptionChangesComponent } from './item-option-changes.component';

describe('ItemOptionChangesComponent', () => {
  let component: ItemOptionChangesComponent;
  let fixture: ComponentFixture<ItemOptionChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOptionChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOptionChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
