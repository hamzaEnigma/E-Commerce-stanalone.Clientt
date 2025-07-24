import { CommonModule } from '@angular/common';
import {Component,computed,inject} from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-toast-alert',
  imports: [CommonModule],
  templateUrl: './toast-alert.component.html',
  styleUrl: './toast-alert.component.scss',
})
export class ToastAlertComponent {
  private toastService = inject(ToastService);
  alerts = computed(()=>this.toastService.alerts());

  constructor() {
  }


}
