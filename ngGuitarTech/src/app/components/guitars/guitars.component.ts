import { Guitar } from 'src/app/models/guitar';
import { ViewService } from './../../services/view.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { GuitarPicture } from 'src/app/models/guitar-picture';
import { GuitarPictureService } from 'src/app/services/guitar-picture.service';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  guitarsList: Guitar[] = [new Guitar()];
  pictures: GuitarPicture[] = [];
  loggedInUser: User = new User();

  constructor(private viewService: ViewService,
    private guitarServ: GuitarService,
    private authServ: AuthService,
    private pictureServ: GuitarPictureService) {}

  ngOnInit(): void {
    this.viewService.setGuitarsSelected(true);

    if (this.authServ.checkLogin()) {
      this.authServ.getLoggedInUser().subscribe({
        next: (user) => {
          this.loggedInUser = user;
          this.loadUserGuitars();
          // this.loadUserGuitarPictures();
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
        console.log('successfully got guitars');
        this.loadUserGuitarPictures();
      },
      error: (fail) => {
        console.error('GuitarsComponent.loadUserGuitars(): Error getting guitars');
        console.error(fail);
      },
    });
  }

  loadUserGuitarPictures() {
    this.pictureServ.indexByUser().subscribe({
      next: (picturesFromDB) => {
        this.pictures = picturesFromDB;
        console.log('successfully got pictures');
        this.addPicturesToGuitars();
      },
      error: (fail) => {
        console.error('GuitarsComponent.loadUserGuitarPictures(): Error getting pictures');
        console.error(fail);
      },
    });
  }

  addPicturesToGuitars() {
    console.log('in addPicturesToGuitars()');
    for (let p of this.pictures) {
      console.log('in first loop with ' + p.filename);
      for (let g of this.guitarsList) {
        console.log('in second loop with ' + g.make + ' ' + g.model);
        if (p.guitar.id === g.id) {
          g.picture = 'assets/' + p.filename;
          console.log('adding ' + p.filename + ' to ' + g.make);
        }
      }
    }

  }

  guitarsListEmpty() {
    if (this.guitarsList.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
