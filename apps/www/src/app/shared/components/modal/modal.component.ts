import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalService,
  ModalType,
  ModalConfig,
} from '../../../services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kr-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  protected readonly modalService = inject(ModalService);
  private readonly _config = new BehaviorSubject<ModalConfig | null>(null);

  constructor() {
    this.modalService.config$.subscribe((config) => this._config.next(config));
  }

  protected onBackdropClick(event: Event): void {
    this.modalService.close();
  }

  protected onPrimaryClick(): void {
    const config = this._config.getValue();
    if (config?.primaryButton) {
      config.primaryButton.onClick();
    }
    this.modalService.close();
  }

  protected onSecondaryClick(): void {
    const config = this._config.getValue();
    if (config?.secondaryButton) {
      config.secondaryButton.onClick();
    }
    this.modalService.close();
  }

  protected getModalTypeClass(): string {
    const type = this._config.getValue()?.type;
    return type ? `modal--${type}` : '';
  }

  protected getButtonClass(): string {
    const type = this._config.getValue()?.type;
    return type ? `modal--${type}` : 'modal--primary';
  }
}
