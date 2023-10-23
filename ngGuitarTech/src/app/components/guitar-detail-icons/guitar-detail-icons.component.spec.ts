import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarDetailIconsComponent } from './guitar-detail-icons.component';

describe('GuitarDetailIconsComponent', () => {
  let component: GuitarDetailIconsComponent;
  let fixture: ComponentFixture<GuitarDetailIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuitarDetailIconsComponent]
    });
    fixture = TestBed.createComponent(GuitarDetailIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
