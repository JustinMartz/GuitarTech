import { Component, Input, OnInit } from '@angular/core';
import { Setup } from 'src/app/models/setup';

@Component({
  selector: 'app-setup-detail',
  templateUrl: './setup-detail.component.html',
  styleUrls: ['./setup-detail.component.css']
})
export class SetupDetailComponent implements OnInit {
  @Input() setup: Setup = new Setup();
  constructor() { }

  ngOnInit() {
  }

}
