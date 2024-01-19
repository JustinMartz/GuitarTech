import { Component } from '@angular/core';
import { User } from '../models/user';
import { Guitar } from '../models/guitar';
import { GuitarPicture } from '../models/guitar-picture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login-modal-link',
  templateUrl: './login-modal-link.component.html',
  styleUrls: ['./login-modal-link.component.css']
})
export class LoginModalLinkComponent {
  closeResult = '';
  loginOpen: boolean = true;
  modalOpen: boolean = false;
  newUser: User = new User();

  loginForm = new FormGroup({
    loginUsername: new FormControl('', Validators.required),
    loginPassword: new FormControl('', Validators.required)
  });

  registrationForm = new FormGroup({
    registrationUsername: new FormControl('', Validators.required),
    registrationPassword: new FormControl('', Validators.required)
  });

	constructor(private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private appServ: AppService,
    private toastServ: ToastService) {}

  ngOnInit(): void {
    this.loginOpen = true;
    this.loginForm.reset();
    this.registrationForm.reset();
  }

	open(content: any) {
    this.modalOpen = true;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.modalOpen = false;
        if (this.loginOpen) {

        } else {
          // register
        }
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.modalOpen = false;
			},
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
            if (window.screen.width >= 1280) {
              this.router.navigateByUrl('/desktop');
            } else {
              this.router.navigateByUrl('/guitars');
            }
          },
          error: (problem) => {
            console.error('LoginRegisterModalComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (fail) => {
        console.error('LoginRegisterModalComponent.register(): Error registering account');
        console.error(fail);
      }
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
        console.error('LoginRegisterModalComponent.login(): Error logging in user:');
        console.error(problem);
        this.toastServ.show('Error logging in.', { classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }

  loginIcon() {
    if (this.modalOpen) {
      return 'login-register-icon-selected';
    } else {
      return 'login-register-icon-deselected';
    }
  }

  autoFill() {
    this.loginForm.setValue({loginUsername: 'sally', loginPassword: '1234'});
  }

  get loginUsername() { return this.loginForm.get('loginUsername'); }

  get loginPassword() { return this.loginForm.get('loginPassword'); }

  get registrationUsername() { return this.registrationForm.get('registrationUsername'); }

  get registrationPassword() { return this.registrationForm.get('registrationPassword'); }

  get newLoginUser() {
    const o: any = {};
    Object.assign(o, this.loginForm.value);
    return new User(0, o.loginUsername, o.loginPassword, 'player');
  }
}
