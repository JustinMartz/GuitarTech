import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginRegisterModalComponent } from '../login-register-modal/login-register-modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('loginModal', { static: false }) loginModal: LoginRegisterModalComponent | undefined;

  ngOnInit(): void {
    console.log('LandingComponent.ngOnInit()');
  }

  openLoginModal() {
    this.loginModal?.open('login');
  }
}
