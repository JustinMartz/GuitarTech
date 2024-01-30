import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/services/setup.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-setups',
  templateUrl: './setups.component.html',
  styleUrls: ['./setups.component.css']
})
export class SetupsComponent implements OnInit {

  constructor(private viewService: ViewService, private setupServ: SetupService)
  {
    if (this.setupServ.setupsList.length === 0 || this.setupServ.setupsList[0].id === 0) {
      setupServ.indexByUser().subscribe({
        next: (setupsFromDB) => {
          setupServ.loadSetups(setupsFromDB);
        },
        error: (massiveFail) => {
          console.error('SetupsComponent.constructor(): Error getting setups from database');
          console.error(massiveFail);
        }
      });
    }
  }

  ngOnInit(): void {
    this.viewService.setGuitarsSelected(false);
  }

  setupsListEmpty() {
    if (this.setups.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  get setups() { return this.setupServ.setupsList; }
}
