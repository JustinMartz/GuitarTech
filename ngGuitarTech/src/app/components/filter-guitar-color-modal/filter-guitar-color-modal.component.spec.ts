import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGuitarColorModalComponent } from './filter-guitar-color-modal.component';

describe('FilterGuitarColorModalComponent', () => {
  let component: FilterGuitarColorModalComponent;
  let fixture: ComponentFixture<FilterGuitarColorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGuitarColorModalComponent]
    });
    fixture = TestBed.createComponent(FilterGuitarColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
