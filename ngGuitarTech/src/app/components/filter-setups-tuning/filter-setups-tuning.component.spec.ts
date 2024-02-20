import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSetupsTuningComponent } from './filter-setups-tuning.component';

describe('FilterSetupsTuningComponent', () => {
  let component: FilterSetupsTuningComponent;
  let fixture: ComponentFixture<FilterSetupsTuningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSetupsTuningComponent]
    });
    fixture = TestBed.createComponent(FilterSetupsTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
