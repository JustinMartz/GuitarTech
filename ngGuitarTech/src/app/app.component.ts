import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ViewService } from './services/view.service';
import { GuitarService } from './services/guitar.service';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GuitarService, AppService]
})
export class AppComponent implements OnInit {
  title = 'GuitarTech';
  mobile: boolean = false;

  constructor(private router: Router,
    private appServ: AppService,
    private toastServ: ToastService){}

  ngOnInit(): void {
    this.loadToasts();
    if (window.screen.width < 1280) {
      this.mobile = true;
    }
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  loadToasts() {
    if (localStorage.getItem('justLoggedOut') === 'yes') {
      //this.toastServ.show('Successfully logged out.', { classname: 'bg-danger text-light', delay: 3000 });
      //console.log('calling toast from app.component');
      localStorage.setItem('justLoggedOut', 'no');
    }
  }
}
