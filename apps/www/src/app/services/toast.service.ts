import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'danger' | 'success' | 'info' | 'warning';

export interface ToastConfig {
  message: string;
  type: ToastType;
  description?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = new BehaviorSubject<ToastConfig[]>([]);
  public readonly toasts$ = this._toasts.asObservable();

  public show(config: ToastConfig): void {
    const currentToasts = this._toasts.getValue();
    const newToast = {
      ...config,
      duration: config.duration || 3000,
    };

    this._toasts.next([...currentToasts, newToast]);

    setTimeout(() => {
      this.remove(newToast.message);
    }, newToast.duration);
  }

  public remove(toastMessage: string): void {
    const currentToasts = this._toasts.getValue();
    this._toasts.next(currentToasts.filter((t) => t.message !== toastMessage));
  }

  public clear(): void {
    this._toasts.next([]);
  }
}
