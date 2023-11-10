import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
