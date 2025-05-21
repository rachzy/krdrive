import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ModalType = 'danger' | 'success' | 'info' | 'warning';

export interface ModalButton {
  label: string;
  onClick: () => void;
}

export interface ModalConfig {
  title: string;
  message: string;
  type: ModalType;
  primaryButton?: ModalButton;
  secondaryButton?: ModalButton;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _isOpen = new BehaviorSubject<boolean>(false);
  public readonly isOpen$ = this._isOpen.asObservable();

  private readonly _config = new BehaviorSubject<ModalConfig | null>(null);
  public readonly config$ = this._config.asObservable();

  public open(config: ModalConfig): void {
    this._config.next(config);
    this._isOpen.next(true);
  }

  public close(): void {
    this._isOpen.next(false);
    this._config.next(null);
  }
}
