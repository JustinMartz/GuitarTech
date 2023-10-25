import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarTopNavComponent } from './guitar-top-nav.component';

describe('GuitarTopNavComponent', () => {
  let component: GuitarTopNavComponent;
  let fixture: ComponentFixture<GuitarTopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuitarTopNavComponent]
    });
    fixture = TestBed.createComponent(GuitarTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
