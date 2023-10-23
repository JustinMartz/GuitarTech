import { Guitar } from 'src/app/models/guitar';
import { ViewService } from './../../services/view.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  guitarsList: Guitar[] = [];


  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    console.log('in GuitarsComponent.ngOnInit()');
    this.viewService.setGuitarsSelected(true);
  }
}
