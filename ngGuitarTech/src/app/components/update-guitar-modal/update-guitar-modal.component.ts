import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guitar } from 'src/app/models/guitar';
import { AuthService } from 'src/app/services/auth.service';
import { GuitarService } from 'src/app/services/guitar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-guitar-modal',
  templateUrl: './update-guitar-modal.component.html',
  styleUrls: ['./update-guitar-modal.component.css']
})
export class UpdateGuitarModalComponent {
  @Input() guitarToUpdate: Guitar = new Guitar();
  @Output() updateSuccessful: boolean = false;

  originalCopy: Guitar = new Guitar();

  isEditSelected: boolean = false;
  closeResult = '';

  constructor(private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private guitarService: GuitarService) {}

  open(content: any) {
    this.isEditSelected = true;
    this.originalCopy = structuredClone(this.guitarToUpdate);

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', scrollable: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.isEditSelected = false;
        console.log('Cancel click');
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.isEditSelected = false;
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

  onUpdateClick() {
    this.guitarService.update(this.originalCopy).pipe(
      finalize(() => {
      // This code will be executed after the XHR request completes (whether successful or with an error)
      this.modalService.dismissAll();
      console.log('calling navigateByUrl()');
      this.router.navigateByUrl('/guitars');
    })).subscribe({
      next: (updatedGuitar) => {
        updatedGuitar.picture = this.originalCopy.picture;
        this.guitarService.updateGuitarInGuitarList(updatedGuitar);
        // this.reload();
        // close modal
        // navigate to /guitars
        // this.modalService.dismissAll();
        // this.router.navigateByUrl('/guitars');
        // window.location.reload();
        console.log('getting observables from guitarService.update()');
      },
      error: (nojoy) => {
        console.error('UpdateGuitarModalComponent.onUpdateClick(): error updating Guitar:');
        console.error(nojoy);
      },
    });
    // console.log('calling navToGuitars()');
    // this.navToGuitars();
  }

  updateGuitarIcon() {
    if (this.isEditSelected) {
      return 'edit-guitar-icon-selected';
    } else {
      return 'edit-guitar-icon-deselected';
    }
  }

  navToGuitars() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/guitars');
  }
}
