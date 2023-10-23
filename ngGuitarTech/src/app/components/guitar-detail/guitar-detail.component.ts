import { Component, Input } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.css']
})
export class GuitarDetailComponent {
  @Input() guitar: Guitar = new Guitar();

}
