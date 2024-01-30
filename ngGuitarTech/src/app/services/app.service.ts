import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  justLoggedOut: boolean = false;
  @Input() public set justLoggedOutStatus(foo: boolean) {
    this.justLoggedOut = foo;
  }

  constructor() {}

  get justLoggedOutStatus(): boolean {
    return this.justLoggedOut;
  }

}
