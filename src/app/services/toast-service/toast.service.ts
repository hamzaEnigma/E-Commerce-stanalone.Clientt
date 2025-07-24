import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _alerts = signal<{ id: number; message: string }[]> ([]);
  private alertId = 0;
  alerts = this._alerts.asReadonly();

  show(message: string) {
    const id = ++this.alertId;
    const current = this._alerts();
    this._alerts.set([...current, { id:id, message:message }]);

    setTimeout(() => {
      this._alerts.set(this._alerts().filter(alert => alert.id !== id));
    }, 2000);
  }}
