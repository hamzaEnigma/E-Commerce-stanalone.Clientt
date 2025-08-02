import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading = signal(false);
  loading = this._loading.asReadonly();

  start() {
    this._loading.set(true);
  }

  stop() {
    this._loading.set(false);
  }
}
