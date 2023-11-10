import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private viewService: ViewService) {}

  checkLogin() {
    return this.authService.checkLogin();
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    if (!localStorage['credentials']) {
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
