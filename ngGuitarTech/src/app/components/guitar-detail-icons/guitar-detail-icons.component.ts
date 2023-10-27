import { Component, Input } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';

@Component({
  selector: 'app-guitar-detail-icons',
  templateUrl: './guitar-detail-icons.component.html',
  styleUrls: ['./guitar-detail-icons.component.css']
})
export class GuitarDetailIconsComponent {
  @Input() selectedGuitar: Guitar = new Guitar();
  deleteSelected: boolean = false;

  deleteIcon() {
    if (this.deleteSelected) {
      return 'delete-guitar-selected';
    } else {
      return 'delete-guitar-deselected';
    }
  }
}
