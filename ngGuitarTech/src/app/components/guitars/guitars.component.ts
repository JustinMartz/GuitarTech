import { Guitar } from 'src/app/models/guitar';
import { ViewService } from './../../services/view.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { GuitarPicture } from 'src/app/models/guitar-picture';
import { GuitarPictureService } from 'src/app/services/guitar-picture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css'],
})
export class GuitarsComponent implements OnInit {

  pictures: GuitarPicture[] = [];
  loggedInUser: User = new User();
  userIsLoggedIn: boolean = false;

  constructor(private viewService: ViewService,
    private router: Router,
    private guitarServ: GuitarService,
    private authServ: AuthService,
    private pictureServ: GuitarPictureService) {
      console.log('in GuitarsComponent.constructor()');
      console.log('primaryGuitarsList = ' + this.guitars.length);
      if (this.guitarServ.guitarsList.length === 0 || this.guitarServ.guitarsList[0].id === 0) {
        console.log('no guitars loaded yet');
        guitarServ.indexByUser().subscribe({
          next: (guitarsFromDB) => {
            console.log('loading guitars from GuitarsComponent constructor');
            guitarServ.loadGuitars(guitarsFromDB);
            this.loadUserGuitarPictures();
          },
          error: (massiveFail) => {
            console.log('GuitarsComponent.constructor(): Error getting guitars from database');
          }
        });
      }

      console.log('constructor: userIsLoggedIn: ' + this.userIsLoggedIn);
      // if (!this.userIsLoggedIn) {
      console.log('constructor: checkLogin(): ' + authServ.checkLogin());

      if (authServ.checkLogin()) {
        this.userIsLoggedIn = true;
      }

      if (!authServ.checkLogin()) {
        this.authServ.getLoggedInUser().subscribe({
          next: (user) => {
            this.loggedInUser = user;
            this.userIsLoggedIn = true;
            console.log('setting userIsLoggedIn to true: ' + this.userIsLoggedIn);
          },
          error: (fail) => {
            // TODO Toast 'error getting user / must be logged in to view this'
            this.userIsLoggedIn = false;
            console.error('constructor(): Error getting user');
            console.error(fail);
            this.router.navigateByUrl('/landing');
          },
        });
      }
    }

    ngOnInit(): void {
    console.log('in GuitarsComponent ngOnInit()');
    this.viewService.setGuitarsSelected(true);

    // console.log('ngOnInit(): checkLogin(): ' + this.authServ.checkLogin());
      // if (!this.authServ.checkLogin()) {
      //   console.log('*** inside if statement');
      //   this.authServ.getLoggedInUser().subscribe({
      //     next: (user) => {
      //       this.loggedInUser = user;
      //       this.userIsLoggedIn = true;
      //       console.log('setting userIsLoggedIn to true: ' + this.userIsLoggedIn);
      //     },
      //     error: (fail) => {
      //       // TODO Toast 'error getting user / must be logged in to view this'
      //       this.userIsLoggedIn = false;
      //       console.error('ngOnInit(): Error getting user');
      //       console.error(fail);
      //       this.router.navigateByUrl('/landing');
      //     },
      //   });
      // }

  }

  loadUserGuitarPictures() {
    this.pictureServ.indexByUser().subscribe({
      next: (picturesFromDB) => {
        this.pictureServ.loadPictures(picturesFromDB, this.guitarServ.guitarsList);
        // this.addPicturesToGuitars();
        console.log('pictures loaded');
      },
      error: (fail) => {
        console.error('GuitarsComponent.loadUserGuitarPictures(): Error getting pictures');
        console.error(fail);
      },
    });
  }

  guitarsListEmpty() {
    if (this.guitars.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  get guitars() { return this.guitarServ.guitarsList; }
}
