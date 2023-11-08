import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ViewService } from './services/view.service';
import { GuitarService } from './services/guitar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GuitarService]
})
export class AppComponent {
  title = 'GuitarTech';

  constructor() {}

}
