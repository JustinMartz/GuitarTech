import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-self-closing-guitar-delete-alert',
  // standalone: true,
  // imports: [NgIf, NgbAlertModule],
  templateUrl: './self-closing-guitar-delete-alert.component.html',
  styleUrls: ['./self-closing-guitar-delete-alert.component.css']
})
export class SelfClosingGuitarDeleteAlertComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  constructor(){
    // this.selfClosingAlert = selfClosingAlert;
  }

  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  public changeSuccessMessage() {
		this._success.next(`${new Date()} - Message successfully changed.`);
	}

}
