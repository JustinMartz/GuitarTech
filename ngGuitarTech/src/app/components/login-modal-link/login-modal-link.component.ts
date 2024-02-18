import { Component, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { Guitar } from '../../models/guitar';
import { GuitarPicture } from '../../models/guitar-picture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-modal-link',
  templateUrl: './login-modal-link.component.html',
  styleUrls: ['./login-modal-link.component.css'],
})
export class LoginModalLinkComponent {
  closeResult = '';
  loginOpen: boolean = true;
  modalOpen: boolean = false;

  loginForm = new FormGroup({
    loginUsername: new FormControl('', Validators.required),
    loginPassword: new FormControl('', Validators.required),
  });

  registrationForm = new FormGroup({
    registrationUsername: new FormControl('', Validators.required),
    registrationPassword: new FormControl('', Validators.required),
  });

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private appServ: AppService,
    private toastServ: ToastService
  ) {}

  ngOnInit(): void {
    this.loginOpen = true;
    this.loginForm.reset();
    this.registrationForm.reset();
  }

  open(content: any) {
    this.modalOpen = true;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.modalOpen = false;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.modalOpen = false;
        }
      );
  }

  onLoginClick(content: any) {
    this.loginOpen = true;
    this.modalService.dismissAll();
    this.open(content);
  }

  onRegisterClick(content: any) {
    this.loginOpen = false;
    this.modalService.dismissAll();
    this.open(content);
  }

  onSubmitClick() {
    if (this.loginOpen) {
      console.log('logging in existing user');
      // construct new user object from form values
      let tmpUser = this.loginForm.value.loginUsername;
      let tmpPass = this.loginForm.value.loginPassword;

      if (tmpUser != null) {
        this.newLoginUser.username = tmpUser;
      }

      if (tmpPass != null) {
        this.newLoginUser.password = tmpPass;
      }

      this.login(this.newLoginUser);
      this.modalService.dismissAll();
    } else {
      console.log('register modal open and submit clicked');
      // construct new user object from form values
      let tmpUser = this.registrationForm.value.registrationUsername;
      let tmpPass = this.registrationForm.value.registrationPassword;
      if (tmpUser != null) {
        this.newRegistrationUser.username = tmpUser;
      }

      if (tmpPass != null) {
        this.newRegistrationUser.password = tmpPass;
      }

      this.register(this.newRegistrationUser);
      this.modalService.dismissAll();
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  register(user: User): void {
    this.authService.register(user).subscribe({
      next: (registeredUser) => {
        this.authService.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            if (window.innerWidth >= 481) {
              this.router.navigateByUrl('/desktop');
            } else {
              this.router.navigateByUrl('/guitars');
            }
          },
          error: (problem) => {
            console.error(
              'LoginModalLinkComponent.register(): Error logging in user:'
            );
            console.error(problem);
          },
        });
      },
      error: (fail) => {
        console.error(
          'LoginModalLinkComponent.register(): Error registering account'
        );
        console.error(fail);
      },
    });
  }

  login(user: User) {
    this.authService.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        if (window.screen.width >= 1280) {
          this.router.navigateByUrl('/desktop');
        } else {
          this.router.navigateByUrl('/guitars');
        }
      },
      error: (problem) => {
        console.error(
          'LoginModalLinkComponent.login(): Error logging in user:'
        );
        console.error(problem);
        this.toastServ.show('Error logging in.', {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      },
    });
  }

  loginIcon() {
    if (this.modalOpen) {
      return 'login-register-icon-selected';
    } else {
      return 'login-register-icon-deselected';
    }
  }

  openLoginForm(content: any) {
    this.loginOpen = true;
    this.open(content);
  }

  openRegisterForm(content: any) {
    this.loginOpen = false;
    this.open(content);
  }

  autoFill() {
    this.loginForm.setValue({ loginUsername: 'sally', loginPassword: '1234' });
  }

  get loginUsername() {
    return this.loginForm.get('loginUsername');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  get registrationUsername() {
    return this.registrationForm.get('registrationUsername');
  }

  get registrationPassword() {
    return this.registrationForm.get('registrationPassword');
  }

  get newLoginUser() {
    const o: any = {};
    Object.assign(o, this.loginForm.value);
    return new User(0, o.loginUsername, o.loginPassword, 'player');
  }

  get newRegistrationUser() {
    const o: any = {};
    Object.assign(o, this.registrationForm.value);
    return new User(0, o.registrationUsername, o.registrationPassword, 'player');
  }
}
