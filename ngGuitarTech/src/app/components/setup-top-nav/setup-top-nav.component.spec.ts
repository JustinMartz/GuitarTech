import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopNavComponent } from './setup-top-nav.component';

describe('SetupTopNavComponent', () => {
  let component: SetupTopNavComponent;
  let fixture: ComponentFixture<SetupTopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupTopNavComponent]
    });
    fixture = TestBed.createComponent(SetupTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
