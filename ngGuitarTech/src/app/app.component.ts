import { Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ViewService } from './services/view.service';
import { GuitarService } from './services/guitar.service';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { ToastService } from './services/toast.service';
import { HostListener } from "@angular/core";

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
    private toastServ: ToastService,
    private renderer: Renderer2,
    private el: ElementRef) {

    }

  ngOnInit(): void {
    this.loadToasts();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'offsetHeight', window.innerHeight);
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
