import { Component, computed, inject, Signal } from '@angular/core';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { orderDetail } from '../../interfaces/chart/order-detail.model';
import { ChartService } from '../../services/chart/chart.service';
import { CartItemsComponent } from './components/cart-items/cart-items.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, CartItemsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private chartService = inject(ChartService);
  orderDetails: Signal<orderDetail[]> = computed(() => this.chartService.itemsCart());
  totalSum: number | undefined = 0;

  ngOnInit() {
    this.chartService.total$.pipe(tap((x) => (this.totalSum = x))).subscribe();
  }

}
