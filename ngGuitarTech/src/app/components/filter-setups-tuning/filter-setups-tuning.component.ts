import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-filter-setups-tuning',
  templateUrl: './filter-setups-tuning.component.html',
  styleUrls: ['./filter-setups-tuning.component.css'],
})
export class FilterSetupsTuningComponent implements OnInit {
  isFilterSelected: boolean = false;
  tuningControl = new FormControl('');
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private setupService: SetupService) {}

  ngOnInit(): void {
    this.tuningControl.setValue('1');
  }

  filterByTuningIcon() {
    if (this.isFilterSelected) {
      return 'filter-tuning-icon-selected';
    } else {
      return 'filter-tuning-icon-deselected';
    }
  }

  open(content: any) {
    this.isFilterSelected = true;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.isFilterSelected = false;
          this.tuningControl.setValue('1');
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.isFilterSelected = false;
        }
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

  onFilterClick() {
    if (typeof Number(this.tuningControl.value) !== "number") {
      return;
    }

    this.setupService.indexByTuning(Number(this.tuningControl.value)).subscribe({
      next: (setupsFromDB) => {
        this.setupService.loadSetups(setupsFromDB);
      },
      error: (massiveFail) => {
        console.error('FilterSetupsTuning.onFilterClick(): Error getting setups from database');
        console.error(massiveFail);
      }
    });
    this.modalService.dismissAll();
  }

  resetSetups() {
    this.setupService.indexByUser().subscribe({
      next: (setupsFromDB) => {
        this.setupService.loadSetups(setupsFromDB);
      },
      error: (massiveFail) => {
        console.error('FilterSetupsTuning.resetSetups(): Error getting setups from database');
        console.error(massiveFail);
      }
    });
    this.modalService.dismissAll();
  }
}
