import { ToastContainerComponent } from './../toast-container/toast-container.component';
import { Guitar } from 'src/app/models/guitar';
import { ViewService } from './../../services/view.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { GuitarPicture } from 'src/app/models/guitar-picture';
import { GuitarPictureService } from 'src/app/services/guitar-picture.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css'],
})
export class GuitarsComponent implements OnInit, OnDestroy {

  loggedInUser: User = new User();
  userIsLoggedIn: boolean = false;

  constructor(private viewService: ViewService,
    private router: Router,
    private guitarServ: GuitarService,
    private authServ: AuthService,
    private pictureServ: GuitarPictureService,
    private toastServ: ToastService) {
      if (this.guitarServ.guitarsList.length === 0 || this.guitarServ.guitarsList[0].id === 0) {
        guitarServ.indexByUser().subscribe({
          next: (guitarsFromDB) => {
            guitarServ.loadGuitars(guitarsFromDB);
            this.loadUserGuitarPictures();
          },
          error: (massiveFail) => {
            console.error('GuitarsComponent.constructor(): Error getting guitars from database');
            console.error(massiveFail);
          }
        });
      }

      if (authServ.checkLogin()) {
        this.userIsLoggedIn = true;
        localStorage.setItem('justLoggedOut', 'yes');
      }

      if (!authServ.checkLogin()) {
        this.authServ.getLoggedInUser().subscribe({
          next: (user) => {
            this.loggedInUser = user;
            this.userIsLoggedIn = true;
          },
          error: (fail) => {
            toastServ.show('Must be logged in to view guitars.', { classname: 'bg-danger text-light', delay: 3000 });
            this.userIsLoggedIn = false;
            console.error('constructor(): Error getting user');
            console.error(fail);
            this.router.navigateByUrl('/');
          },
        });
      }
    }

  ngOnInit(): void {
    this.viewService.setGuitarsSelected(true);
  }

  ngOnDestroy(): void {
		// this.toastServ.clear();
	}

  loadUserGuitarPictures() {
    this.pictureServ.indexByUser().subscribe({
      next: (picturesFromDB) => {
        this.pictureServ.loadPictures(picturesFromDB, this.guitarServ.guitarsList);
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

  hasRoute(route: string) {
    console.log("route: " + route);
    return this.router.url.includes(route);
  }

  get guitars() { return this.guitarServ.guitarsList; }
}
