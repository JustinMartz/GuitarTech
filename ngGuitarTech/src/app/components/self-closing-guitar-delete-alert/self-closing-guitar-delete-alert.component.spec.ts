import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfClosingGuitarDeleteAlertComponent } from './self-closing-guitar-delete-alert.component';

describe('SelfClosingGuitarDeleteAlertComponent', () => {
  let component: SelfClosingGuitarDeleteAlertComponent;
  let fixture: ComponentFixture<SelfClosingGuitarDeleteAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfClosingGuitarDeleteAlertComponent]
    });
    fixture = TestBed.createComponent(SelfClosingGuitarDeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
