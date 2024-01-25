import { Component, Input, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-setup-top-nav',
  templateUrl: './setup-top-nav.component.html',
  styleUrls: ['./setup-top-nav.component.css']
})
export class SetupTopNavComponent implements OnInit {
  @Input() userHasSetups: boolean = false;
  guitarList: Guitar[] = [];

  constructor(private guitarService: GuitarService) {}

  ngOnInit() {
    this.guitarService.indexByUser().subscribe({
      next: (guitarsFromDB) => {
        this.guitarService.loadGuitars(guitarsFromDB);
        this.guitarList = JSON.parse(JSON.stringify(guitarsFromDB));
        console.log(this.guitarList);
      },
      error: (massiveFail) => {
        console.error('AddSetupModalComponent.ngOnInit(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
  }
}
