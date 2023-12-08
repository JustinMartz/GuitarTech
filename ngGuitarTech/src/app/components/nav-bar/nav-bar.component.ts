import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private viewService: ViewService,
    private appServ: AppService,
    private toastServ: ToastService) {}

  checkLogin() {
    return this.authService.checkLogin();
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    if (!localStorage['credentials']) {
      localStorage.setItem('justLoggedOut', 'yes');
      console.log('setting justLoggedOut: ' + localStorage.getItem('justLoggedOut'));
      this.toastServ.show('Successfully logged out.', { classname: 'bg-danger text-light', delay: 3000 });
      this.router.navigateByUrl('/');
    }
  }

  checkGuitarsView() {
    if (this.viewService.isGuitarsSelected()) {
      return 'home-icon-selected';
    } else {
      return 'home-icon-deselected';
    }
  }

  checkSetupsView() {
    if (this.viewService.isGuitarsSelected()) {
      return 'setups-icon-deselected';
    } else {
      return 'setups-icon-selected';
    }
  }

}
