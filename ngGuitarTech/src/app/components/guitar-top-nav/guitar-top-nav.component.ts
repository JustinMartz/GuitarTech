import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guitar-top-nav',
  templateUrl: './guitar-top-nav.component.html',
  styleUrls: ['./guitar-top-nav.component.css']
})
export class GuitarTopNavComponent {
  @Input() userHasGuitars: boolean = false;

  addGuitarIcon() {
    if (this.userHasGuitars) {
      return 'add-new-guitar-deselected';
    } else {
      return 'add-new-guitar-pulsing';
    }
  }

  filterColor() {
    return false;
  }

  filterTuning() {
    return false;
  }
}
