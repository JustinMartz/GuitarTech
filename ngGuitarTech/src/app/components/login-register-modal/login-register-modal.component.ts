import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register-modal',
  templateUrl: './login-register-modal.component.html',
  styleUrls: ['./login-register-modal.component.css'],
})
export class LoginRegisterModalComponent implements OnInit {
  closeResult = '';
  user: User = new User();
  loginOpen: boolean = true;
  modalOpen: boolean = false;
  newUser: User = new User();

	constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginOpen = true;
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
    console.log('in onSubmitClick()');
    if (this.loginOpen) {
      console.log('modal view is login');
      this.login(this.user);
      this.modalService.dismissAll();
    }
    if (!this.loginOpen) {
      console.log('modal view is register');
      console.log('username: ' + this.user.username);
      console.log('password: ' + this.user.password);
      this.register(this.user);
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
            this.router.navigateByUrl('/guitars');
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
        this.router.navigateByUrl('/guitars');
      },
      error: (problem) => {
        console.error('LoginRegisterModalComponent.login(): Error logging in user:');
        console.error(problem);
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
}
