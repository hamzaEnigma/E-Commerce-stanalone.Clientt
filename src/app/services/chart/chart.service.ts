import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { orderDetail } from '../../interfaces/chart/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  itemsCartSubject = new BehaviorSubject<orderDetail[]>([]);
  cartItems$ = this.itemsCartSubject.asObservable();
  totalSubject = new BehaviorSubject<number | undefined>(0);
  total$ = this.totalSubject.asObservable();
  panierCount = signal(0);

  constructor() {}

  addToChart(item: orderDetail) {
    const cartItems = this.itemsCartSubject.value;
    const existingIndex = cartItems.findIndex(
      (i) => i.productId === item.productId
    );

    if (existingIndex !== -1) {
      // Update quantity and price if needed
      cartItems[existingIndex].Quantity += item.Quantity;
    } else {
      cartItems.push(item);
    }

    this.itemsCartSubject.next(cartItems);
    this.updateTotal(cartItems);
  }

  updateTotal(items: orderDetail[]) {
    const total = items.reduce(
      (sumTotal, item) =>
        (sumTotal += (item.product?.purchasePrice ?? 0) * item.Quantity),
      0
    );
    this.totalSubject.next(total);
  }
}
