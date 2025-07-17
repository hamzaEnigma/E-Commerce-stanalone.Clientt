import { Component, inject } from '@angular/core';
import { orderDetail } from '../../../interfaces/chart/order-detail.model';
import { ChartService } from '../../../services/chart/chart.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  orderDetails: orderDetail[] | undefined;
  chartService = inject(ChartService);
  totalSum: number | undefined = 0;

  ngOnInit() {
    this.orderDetails = this.chartService.itemCartSignal();
    this.chartService.total$.pipe(tap((x) => (this.totalSum = x))).subscribe();
  }

  incrementQuantity(item: orderDetail): void {
    item.Quantity++;
    this.chartService.updateTotal(this.orderDetails!);
  }

  decrementQuantity(item: orderDetail): void {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.chartService.updateTotal(this.orderDetails!);
    }
  }
}
