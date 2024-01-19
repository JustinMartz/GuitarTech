import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.css']
})
export class DesktopViewComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    console.log('logout');
    this.authService.logout();
    if (!localStorage['credentials']) {
      localStorage.setItem('justLoggedOut', 'yes');
      // console.log('setting justLoggedOut: ' + localStorage.getItem('justLoggedOut'));
      // this.toastServ.show('Successfully logged out.', { classname: 'bg-danger text-light', delay: 3000 });
      this.router.navigateByUrl('/');
    }
  }
}
