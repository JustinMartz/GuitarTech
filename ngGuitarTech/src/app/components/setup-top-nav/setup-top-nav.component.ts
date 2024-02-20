import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  sortedDescending: boolean = false;
  @Output() sortSetups: EventEmitter<any> = new EventEmitter();
  @Output() getSetups: EventEmitter<any> = new EventEmitter();

  constructor(private guitarService: GuitarService) {}

  ngOnInit() {
    this.guitarService.indexByUser().subscribe({
      next: (guitarsFromDB) => {
        this.guitarService.loadGuitars(guitarsFromDB);
        this.guitarList = JSON.parse(JSON.stringify(guitarsFromDB));
      },
      error: (massiveFail) => {
        console.error('AddSetupModalComponent.ngOnInit(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
  }

  toggleSort() {
    this.sortedDescending = !this.sortedDescending;

    if (this.sortedDescending) {
      // get sorted setups
      this.sortSetups.emit(null);
    } else {
      // get regular setups
      this.getSetups.emit(null);
    }
  }
}
