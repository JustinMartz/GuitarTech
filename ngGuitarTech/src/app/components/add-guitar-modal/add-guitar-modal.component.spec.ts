import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuitarModalComponent } from './add-guitar-modal.component';

describe('AddGuitarModalComponent', () => {
  let component: AddGuitarModalComponent;
  let fixture: ComponentFixture<AddGuitarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGuitarModalComponent]
    });
    fixture = TestBed.createComponent(AddGuitarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
