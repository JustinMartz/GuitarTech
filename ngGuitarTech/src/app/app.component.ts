import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GuitarTech';

  constructor(private authService: AuthService) {}

  checkLogin() {
    return this.authService.checkLogin();
  }
}
