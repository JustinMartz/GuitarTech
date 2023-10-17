import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-setups',
  templateUrl: './setups.component.html',
  styleUrls: ['./setups.component.css']
})
export class SetupsComponent implements OnInit {

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    console.log('in SetupsComponent.ngOnInit()');
    this.viewService.setGuitarsSelected(false);
  }
}
