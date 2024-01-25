import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupModalComponent } from './add-setup-modal.component';

describe('AddSetupModalComponent', () => {
  let component: AddSetupModalComponent;
  let fixture: ComponentFixture<AddSetupModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSetupModalComponent]
    });
    fixture = TestBed.createComponent(AddSetupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
