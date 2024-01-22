import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalLinkComponent } from './login-modal-link.component';

describe('LoginModalLinkComponent', () => {
  let component: LoginModalLinkComponent;
  let fixture: ComponentFixture<LoginModalLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginModalLinkComponent]
    });
    fixture = TestBed.createComponent(LoginModalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
