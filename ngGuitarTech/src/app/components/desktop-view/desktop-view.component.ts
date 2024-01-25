import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/services/setup.service';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.css']
})
export class DesktopViewComponent {

  constructor(private authService: AuthService, private router: Router,
    private setupService: SetupService, private guitarService: GuitarService) {}

  logout() {
    this.authService.logout();
    if (!localStorage['credentials']) {
      localStorage.setItem('justLoggedOut', 'yes');
      this.setupService.clearSetups();
      this.guitarService.clearGuitars();
      this.router.navigateByUrl('/');
    }
  }
}
