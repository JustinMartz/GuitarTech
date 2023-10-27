import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guitar } from 'src/app/models/guitar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-guitar-modal',
  templateUrl: './delete-guitar-modal.component.html',
  styleUrls: ['./delete-guitar-modal.component.css']
})
export class DeleteGuitarModalComponent {
  @Input() guitarToDelete: Guitar = new Guitar();

  closeResult = '';

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;

			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  }
}
