import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedSetupsButtonComponent } from './sorted-setups-button.component';

describe('SortedSetupsButtonComponent', () => {
  let component: SortedSetupsButtonComponent;
  let fixture: ComponentFixture<SortedSetupsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortedSetupsButtonComponent]
    });
    fixture = TestBed.createComponent(SortedSetupsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
