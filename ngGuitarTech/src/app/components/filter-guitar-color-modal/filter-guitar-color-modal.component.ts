import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { GuitarPictureService } from 'src/app/services/guitar-picture.service';
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
    private guitarService: GuitarService,
    private pictureService: GuitarPictureService) {}

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
    if (this.colorControl.value == null || this.colorControl.value == '') {
      return;
    }
    // 2. hit endpoint with 'color' and get results returned correctly
    this.guitarService.filterByColor(this.colorControl.value).subscribe({
      next: (guitarsFromDB) => {
        this.guitarService.loadGuitars(guitarsFromDB);
        this.loadUserGuitarPictures();
      },
      error: (massiveFail) => {
        console.error('filter-guitar-color-modal.onFilterClick(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
    // 6. close modal
    this.modalService.dismissAll();
    // 7. update guitarList
  }

  loadUserGuitarPictures() {
    this.pictureService.indexByUser().subscribe({
      next: (picturesFromDB) => {
        this.pictureService.loadPictures(picturesFromDB, this.guitarService.guitarsList);
      },
      error: (fail) => {
        console.error('FilterGuitarColorModalComponent.loadUserGuitarPictures(): Error getting pictures');
        console.error(fail);
      },
    });
  }

  resetGuitars() {
    this.guitarService.indexByUser().subscribe({
      next: (guitarsFromDB) => {
        this.guitarService.loadGuitars(guitarsFromDB);
        this.loadUserGuitarPictures();
      },
      error: (massiveFail) => {
        console.error('filter-guitar-color-modal.resetGuitars(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
    this.modalService.dismissAll();
  }
}
