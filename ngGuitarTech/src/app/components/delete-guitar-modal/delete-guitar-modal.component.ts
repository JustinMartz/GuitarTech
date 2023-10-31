import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guitar } from 'src/app/models/guitar';
import { AuthService } from 'src/app/services/auth.service';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-delete-guitar-modal',
  templateUrl: './delete-guitar-modal.component.html',
  styleUrls: ['./delete-guitar-modal.component.css']
})
export class DeleteGuitarModalComponent {
  @Input() guitarToDelete: Guitar = new Guitar();
  @Output() deleteSuccessful: boolean = false;

  isDeleteSelected: boolean = false;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private guitarService: GuitarService) {}

  open(content: any) {
    this.isDeleteSelected = true;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.isDeleteSelected = false;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.isDeleteSelected = false;
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

  onDeleteClick() {
    console.log('onDeleteClick()');
    // actually delete the guitar
    this.guitarService.delete(this.guitarToDelete.id).subscribe({
      next: (result) => {
        // this.reload();
        this.router.navigateByUrl('guitars');
      },
      error: (nojoy) => {
        console.error('DeleteGuitarModalComponent.onDeleteClick(): error deleting Guitar:');
        console.error(nojoy);
      },
    });
    this.modalService.dismissAll();
  }

  deleteGuitarIcon() {
    if (this.isDeleteSelected) {
      return 'delete-guitar-icon-selected';
    } else {
      return 'delete-guitar-icon-deselected';
    }
  }
}
