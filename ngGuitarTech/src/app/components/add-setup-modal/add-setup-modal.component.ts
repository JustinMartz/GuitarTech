import { Guitar } from 'src/app/models/guitar';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Setup } from 'src/app/models/setup';
import { Tuning } from 'src/app/models/tuning';
import { SetupService } from 'src/app/services/setup.service';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-add-setup-modal',
  templateUrl: './add-setup-modal.component.html',
  styleUrls: ['./add-setup-modal.component.css']
})
export class AddSetupModalComponent {
  @Input() userHasSetups: boolean = false;
  @Input() guitars: Guitar[] = [];
  isAddSelected: boolean = false;
  closeResult = '';
  selectedGuitar: number = 0;
  currentDate = new Date();
  private newSetup: Setup | null;

  setupForm = new FormGroup({
    stringGauge: new FormControl('', Validators.required),
    stringBrand: new FormControl('', Validators.required),
    dateOfSetup: new FormControl(''),
    actionTreble: new FormControl(''),
    actionBass: new FormControl(''),
    notes: new FormControl(''),
    guitarControl: new FormControl(null as Guitar | null, Validators.required),
    tuning: new FormControl('')
  });

  constructor(private modalService: NgbModal, private setupService: SetupService) { this.newSetup = null; }

  ngOnInit(): void {
    this.resetForm();
  }

  open(content: any) {
    console.log('in open()');
    console.log(this.guitars);
    this.isAddSelected = true;

    if (this.guitars.length > 0) {
      this.selectedGuitar = this.guitars[0].id;
    }

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

  resetForm() {
    this.setupForm.reset();
    this.setupForm.get('tuning')?.setValue('1');
    this.setupForm.get('stringGauge')?.setValue('');
    this.setupForm.get('stringBrand')?.setValue('');
    this.setupForm.get('dateOfSetup')?.setValue(new Date().toDateString());
    this.setupForm.get('actionTreble')?.setValue('4');
    this.setupForm.get('actionBass')?.setValue('5');
    this.setupForm.get('notes')?.setValue('');
  }

  onAddClick() {
    this.newSetup = this.getNewSetup;

    for (let g of this.guitars) {
      if (g.id === this.selectedGuitar)
      Object.assign(this.newSetup.guitar, g);
    }

    let tmpStringGauge = this.setupForm.value.stringGauge;
    let tmpDateOfSetup: any = this.setupForm.value.dateOfSetup;

    if (tmpStringGauge !== null) {
      console.log(tmpStringGauge + ' is a string!');
      this.newSetup.stringGauge = tmpStringGauge!;
    }

    this.setupService.create(this.newSetup).subscribe({
      next: (result) => {
        // TODO use SetupService to add and reload
        window.location.reload();
      },
      error: (nojoy) => {
        console.error('AddSetupModalComponent.onAddClick(): error creating Guitar:');
        console.error(nojoy);
      },
    });
    this.modalService.dismissAll();
  }

  addSetupIcon() {
    if (!this.userHasSetups && !this.isAddSelected) {
      return 'add-setup-icon-pulsing';
    } else if (this.isAddSelected) {
      return 'add-setup-icon-selected';
    } else {
      return 'add-setup-icon-deselected';
    }
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

  get stringGauge() { return this.setupForm.get('stringGauge'); }

  get dateOfSetup() { return this.setupForm.get('dateOfSetup'); }

  // get guitar() { return this.setupForm.get('guitar'); }

  get getNewSetup() {
    const o: any = {};
    Object.assign(o, this.setupForm.value);
    return new Setup(0, o.stringGauge, o.stringBrand, new Date(), parseInt(o.actionTreble),
    parseInt(o.actionBass), o.notes, new Guitar(o.Guitar), new Tuning(parseInt(o.tuning), ''),
    false);
  }
}
