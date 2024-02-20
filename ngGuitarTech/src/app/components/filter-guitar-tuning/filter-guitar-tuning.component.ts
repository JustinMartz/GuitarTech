import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuitarPictureService } from 'src/app/services/guitar-picture.service';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-filter-guitar-tuning',
  templateUrl: './filter-guitar-tuning.component.html',
  styleUrls: ['./filter-guitar-tuning.component.css']
})
export class FilterGuitarTuningComponent implements OnInit {
  isFilterSelected: boolean = false;
  tuningControl = new FormControl('');

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private guitarService: GuitarService,
    private pictureService: GuitarPictureService) {}

    ngOnInit(): void {
      this.tuningControl.setValue('1');
    }

  open(content: any) {
    this.isFilterSelected = true;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.isFilterSelected = false;
        this.tuningControl.setValue('1');
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

  filterByTuningIcon() {
    if (this.isFilterSelected) {
      return 'filter-tuning-icon-selected';
    } else {
      return 'filter-tuning-icon-deselected';
    }
  }

  loadUserGuitarPictures() {
    this.pictureService.indexByUser().subscribe({
      next: (picturesFromDB) => {
        this.pictureService.loadPictures(picturesFromDB, this.guitarService.guitarsList);
      },
      error: (fail) => {
        console.error('FilterGuitarTuningModalComponent.loadUserGuitarPictures(): Error getting pictures');
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
        console.error('FilterGuitarTuning.resetGuitars(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
    this.modalService.dismissAll();
  }

  onFilterClick() {
    if (typeof Number(this.tuningControl.value) !== "number") {
      return;
    }

    this.guitarService.filterByTuning(Number(this.tuningControl.value)).subscribe({
      next: (guitarsFromDB) => {
        this.guitarService.loadGuitars(guitarsFromDB);
        this.loadUserGuitarPictures();
      },
      error: (massiveFail) => {
        console.error('FilterGuitarTuning.onFilterClick(): Error getting guitars from database');
        console.error(massiveFail);
      }
    });
    this.modalService.dismissAll();
  }

}
