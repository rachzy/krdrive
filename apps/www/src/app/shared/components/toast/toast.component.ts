import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from '../../../services/toast.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'kr-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);

  protected readonly faTimes = faTimes;

  protected getToastTypeClass(type: ToastType): string {
    return `toast--${type}`;
  }

  protected closeToast(toastMessage: string): void {
    this.toastService.remove(toastMessage);
  }
}
