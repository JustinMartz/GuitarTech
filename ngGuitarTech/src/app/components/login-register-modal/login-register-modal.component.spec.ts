import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterModalComponent } from './login-register-modal.component';

describe('LoginRegisterModalComponent', () => {
  let component: LoginRegisterModalComponent;
  let fixture: ComponentFixture<LoginRegisterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisterModalComponent]
    });
    fixture = TestBed.createComponent(LoginRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
