import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGuitarModalComponent } from './delete-guitar-modal.component';

describe('DeleteGuitarModalComponent', () => {
  let component: DeleteGuitarModalComponent;
  let fixture: ComponentFixture<DeleteGuitarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGuitarModalComponent]
    });
    fixture = TestBed.createComponent(DeleteGuitarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
