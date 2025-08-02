import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { orderDetail } from '../../interfaces/chart/order-detail.model';
import { Product } from '../../interfaces/product/product.model';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  itemsCartSubject = new BehaviorSubject<orderDetail[]>([]);
  cartItems$ = this.itemsCartSubject.asObservable();
  private _itemCartSignal = signal<orderDetail[]>([]);
  itemsCart = this._itemCartSignal.asReadonly();
  totalSubject = new BehaviorSubject<number | undefined>(0);
  private toastService = inject(ToastService);
  total$ = this.totalSubject.asObservable();
  panierCount = signal(0);
  private _sidebarOpen = signal(false);
  sidebarOpen = this._sidebarOpen.asReadonly();
  constructor() {}

  addToChart(product: Product, q: number):Observable<number | undefined> {
    const itemsUpdated = [...this.itemsCart()];
    const index = this.findProductInChart(product.productId!);

    if (index !== -1) {
      itemsUpdated[index].Quantity += q;
      this.toastService.show(`Quantité ${product?.productName} est mis à jour`);
    } else {
      const order = this.createOrderDetail(product, q);
      itemsUpdated.push(order);
      this.toastService.show(
        `Produit ${product?.productName} ajouté au panier`
      );
    }

    this._itemCartSignal.set(itemsUpdated);
    this.updateTotal(itemsUpdated);
    this._sidebarOpen.set(true); // ouvrir sidebar après ajout
    return of(product.productId);
  }

  getOrderId(): number {
    const ids = this.itemsCart().map((x) => x.OrderId ?? 0);
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return nextId;
  }

  private findProductInChart(ProductId: number): number {
    return this.itemsCart().findIndex(
      (x) => x.product?.productId === ProductId
    );
  }

  private createOrderDetail(product: Product, quantity: number): orderDetail {
    return {
      product: product,
      OrderId: this.getOrderId(),
      productId: product.productId,
      Quantity: quantity,
      SalePrice: 0,
    };
  }

  updateTotal(items: orderDetail[]) {
    const total = items.reduce(
      (sumTotal, item) =>
        (sumTotal += (item.product?.purchasePrice ?? 0) * item.Quantity),
      0
    );
    this.totalSubject.next(total);
  }

  delete(id: number) {
    const items = [...this.itemsCart()];
    const index = items.findIndex((x) => (x.OrderId = id));
    if (index != -1) {
      items.splice(index, 1);
    }
    this._itemCartSignal.set(items);
  }
  
  closeSidebar() {
    this._sidebarOpen.set(false);
  }
}
