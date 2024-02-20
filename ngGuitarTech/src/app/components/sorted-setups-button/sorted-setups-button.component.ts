import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sorted-setups-button',
  templateUrl: './sorted-setups-button.component.html',
  styleUrls: ['./sorted-setups-button.component.css']
})
export class SortedSetupsButtonComponent {
  @Input() sortedDescending: boolean = false;

  sortDescendingIcon() {
    if (this.sortedDescending) {
      return 'sort-setups-icon-selected';
    } else {
      return 'sort-setups-icon-deselected';
    }
  }
}
