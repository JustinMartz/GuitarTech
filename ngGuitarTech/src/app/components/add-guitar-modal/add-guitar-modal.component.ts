import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guitar } from 'src/app/models/guitar';
import { AuthService } from 'src/app/services/auth.service';
import { GuitarService } from 'src/app/services/guitar.service';
import { FormControl, FormGroup, RequiredValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NonNullAssert } from '@angular/compiler';
import { User } from 'src/app/models/user';
import { Tuning } from 'src/app/models/tuning';
import { GuitarPicture } from 'src/app/models/guitar-picture';

@Component({
  selector: 'app-add-guitar-modal',
  templateUrl: './add-guitar-modal.component.html',
  styleUrls: ['./add-guitar-modal.component.css']
})
export class AddGuitarModalComponent implements OnInit {
  @Input() userHasGuitars: boolean = false;
  // newGuitar: Guitar = new Guitar();
  isAddSelected: boolean = false;
  closeResult = '';
  // make = new FormControl('');
  // model = new FormControl('');

  guitarForm = new FormGroup({
    make: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    year: new FormControl(''),
    color: new FormControl(''),
    tuning: new FormControl(''),
    scaleLength: new FormControl(''),
    numberOfFrets: new FormControl(''),
    numberOfStrings: new FormControl(''),
    purchasePrice: new FormControl('', Validators.pattern("^[0-9]*$")),
    bridge: new FormControl(''),
    bridgePickup: new FormControl(''),
    middlePickup: new FormControl(''),
    neckPickup: new FormControl(''),
    serialNumber: new FormControl('')
  })

  constructor(private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private guitarService: GuitarService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  addGuitarIcon() {
    if (!this.userHasGuitars && !this.isAddSelected) {
      return 'add-guitar-icon-pulsing';
    } else if (this.isAddSelected) {
      return 'add-guitar-icon-selected';
    } else {
      return 'add-guitar-icon-deselected';
    }
  }

  onAddClick() {
    console.log('Add clicked');

    let tmpMake = this.guitarForm.value.make;

    let tmpYear: any = this.guitarForm.value.year;

    if (tmpMake !== null) {
      console.log(tmpMake + ' is a string!');
      this.newGuitar.make = tmpMake!;
    }

    if (this.guitarForm.value.model !== null) {
      console.log("model is not null and contains " + this.guitarForm.value.model)
      this.newGuitar.model = this.newGuitar.model;
    }
    console.log(this.newGuitar);

    console.log('year: ' + this.guitarForm.value.year);
    if (/^\d+$/.test(tmpYear)) {
      console.log(tmpYear + ' is a number!');
    }

    console.log('newGuitar(): ' + JSON.stringify(this.newGuitar));
    this.guitarService.create(this.newGuitar).subscribe({
      next: (result) => {
        // this.reload();
        window.location.reload();
      },
      error: (nojoy) => {
        console.error('AddGuitarModalComponent.onAddClick(): error creating Guitar:');
        console.error(nojoy);
      },
    });
    this.modalService.dismissAll();
  }

  open(content: any) {
    this.isAddSelected = true;

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', scrollable: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.isAddSelected = false;
        console.log('Cancel click');
        this.resetForm();
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.isAddSelected = false;
        this.resetForm();
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

  resetForm() {
    this.guitarForm.reset();
    this.guitarForm.get('tuning')?.setValue('1');
    this.guitarForm.get('scaleLength')?.setValue('25.5');
    this.guitarForm.get('numberOfFrets')?.setValue('22');
    this.guitarForm.get('year')?.setValue('2023');
    this.guitarForm.get('numberOfStrings')?.setValue('6');
  }

  get make() { return this.guitarForm.get('make'); }

  get model() { return this.guitarForm.get('model'); }

  get purchasePrice() { return this.guitarForm.get('purchasePrice'); }

  get newGuitar() {
    const o: any = {};
    Object.assign(o, this.guitarForm.value);
    return new Guitar(0, o.make, o.model, parseInt(o.year), o.color, false, new User(),
    new Tuning(parseInt(o.tuning), ''), parseFloat(o.scaleLength), parseInt(o.numberOfFrets),
    parseInt(o.numberOfStrings), o.bridge, parseInt(o.purchasePrice), o.currency,
    o.bridgePickup, o.middlePickup, o.neckPickup, o.serialNumber);
  }

}
