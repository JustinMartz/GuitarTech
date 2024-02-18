import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-filter-guitar-color-modal',
  templateUrl: './filter-guitar-color-modal.component.html',
  styleUrls: ['./filter-guitar-color-modal.component.css']
})
export class FilterGuitarColorModalComponent {
  isFilterSelected: boolean = false;
  colorControl = new FormControl('');

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private guitarService: GuitarService) {}

  open(content: any) {
    this.isFilterSelected = true;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.isFilterSelected = false;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.isFilterSelected = false;
			},
		);
	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  filterByColorIcon() {
    if (this.isFilterSelected) {
      return 'filter-color-icon-selected';
    } else {
      return 'filter-color-icon-deselected';
    }
  }

  onFilterClick() {
    // eventemit the color back to filter() in guitar-top-nav
    // or just make the guitarList available through GuitarService :/
    //1. get color passed in correctly
    console.log('onFilterClick(): ' + this.colorControl.value);
  }
}
