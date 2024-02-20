import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGuitarTuningComponent } from './filter-guitar-tuning.component';

describe('FilterGuitarTuningComponent', () => {
  let component: FilterGuitarTuningComponent;
  let fixture: ComponentFixture<FilterGuitarTuningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGuitarTuningComponent]
    });
    fixture = TestBed.createComponent(FilterGuitarTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
