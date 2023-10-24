import { Guitar } from 'src/app/models/guitar';
import { ViewService } from './../../services/view.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  guitarsList: Guitar[] = [];
  loggedInUser: User = new User();

  constructor(private viewService: ViewService, private guitarServ: GuitarService, private authServ: AuthService) {}

  ngOnInit(): void {
    console.log('in GuitarsComponent.ngOnInit()');
    this.viewService.setGuitarsSelected(true);

    if (this.authServ.checkLogin()) {
      this.authServ.getLoggedInUser().subscribe({
        next: (user) => {
          this.loggedInUser = user;
          this.loadUserGuitars();
        },
        error: (fail) => {
          console.error('ngOnInit(): Error getting user');
          console.error(fail);
        },
      });
    }
  }

  loadUserGuitars() {
    this.guitarServ.indexByUser().subscribe({
      next: (guitarsFromDB) => {
        this.guitarsList = guitarsFromDB;
      },
      error: (fail) => {
        console.error('GuitarsComponent.loadUserGuitars(): Error getting guitars');
        console.error(fail);
      },
    });
  }
}
