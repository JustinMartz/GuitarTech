import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  guitarsSelected: boolean = false;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.guitarsSelected = true;
  }
}
