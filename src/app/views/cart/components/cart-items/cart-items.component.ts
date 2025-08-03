import { Component, computed, inject, Signal } from '@angular/core';
import { orderDetail } from '../../../../interfaces/chart/order-detail.model';
import { ChartService } from '../../../../services/chart/chart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cart-items',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
  animations: [
      trigger('fadeChange', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
        ])
      ])
    ]
})
export class CartItemsComponent {
  private chartService = inject(ChartService);
  orderDetails: Signal<orderDetail[]> = computed(() =>
    this.chartService.itemsCart()
  );

  getStockBadgeClass(item: orderDetail): string {
    const stock = item.product?.unitsInStock ?? 0;
    const qte = item.Quantity ?? 0;
    var res =
      stock > qte
        ? 'badge-stock'
        : stock == qte
        ? 'badge-warning'
        : 'badge-danger';
    return res;
  }

  getStockBadgeLabel(item: orderDetail): string {
    const stock = item.product?.unitsInStock ?? 0;
    const qty = item.Quantity ?? 0;

    if (qty < stock) return 'En stock';
    if (qty === stock) return 'Stock presque épuisé';
    return 'Quantité dépassée'; // ne devrait jamais apparaître si tu bloques bien
  }

  incrementQuantity(item: orderDetail): void {
    if (item.Quantity < item.product?.unitsInStock!) {
      item.Quantity++;
      this.chartService.updateTotal(this.orderDetails());
    } else {
      alert('la quanitité dans le stock est insuffisante');
    }
  }

  decrementQuantity(item: orderDetail): void {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.chartService.updateTotal(this.orderDetails());
    }
  }

  deleteItemFromChart(event: Event, id: number) {
    event.preventDefault();
    // empêche la redirection
    this.chartService.delete(id);
  }
}
