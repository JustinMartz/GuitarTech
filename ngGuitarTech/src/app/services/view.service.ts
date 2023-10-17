import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  guitarsSelected: boolean | undefined;

  constructor() { }

  isGuitarsSelected() {
    return this.guitarsSelected;
  }

  setGuitarsSelected(arg: boolean) {
    this.guitarsSelected = arg;
  }
}
