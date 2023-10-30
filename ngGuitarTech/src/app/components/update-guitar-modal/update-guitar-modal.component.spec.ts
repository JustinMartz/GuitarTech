import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuitarModalComponent } from './update-guitar-modal.component';

describe('UpdateGuitarModalComponent', () => {
  let component: UpdateGuitarModalComponent;
  let fixture: ComponentFixture<UpdateGuitarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGuitarModalComponent]
    });
    fixture = TestBed.createComponent(UpdateGuitarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
