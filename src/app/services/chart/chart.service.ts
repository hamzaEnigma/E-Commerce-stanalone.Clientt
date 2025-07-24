import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { orderDetail } from '../../interfaces/chart/order-detail.model';
import { Product } from '../../interfaces/product/product.model';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  itemsCartSubject = new BehaviorSubject<orderDetail[]>([]);
  cartItems$ = this.itemsCartSubject.asObservable();
  itemCartSignal = signal<orderDetail[]>([]);
  totalSubject = new BehaviorSubject<number | undefined>(0);
  private toastService = inject(ToastService);
  total$ = this.totalSubject.asObservable();
  panierCount = signal(0);

  constructor() {}

  addTochartSignal(item: orderDetail) {
    const itemsUpdated = [...this.itemCartSignal()];
      itemsUpdated.push(item);
      this.itemCartSignal.set(itemsUpdated);
      this.updateTotal(itemsUpdated);
      this.toastService.show(`${item.product?.productName} is added to chart`)
  }

  updateTotal(items: orderDetail[]) {
    const total = items.reduce(
      (sumTotal, item) =>
        (sumTotal += (item.product?.purchasePrice ?? 0) * item.Quantity),
      0
    );
    this.totalSubject.next(total);
  }

  addTochartWithQuantity(product: Product, quantity: number) {
    const order: orderDetail = {
      product: product,
      OrderId: undefined,
      productId: product.productId,
      Quantity: quantity,
      SalePrice: 0,
    };
    const itemsUpdated = [...this.itemCartSignal()];
      itemsUpdated.push(order);
      this.itemCartSignal.set(itemsUpdated);
      this.updateTotal(itemsUpdated);
      this.toastService.show(`${product.productName} is added to chart` )  
  }
}
