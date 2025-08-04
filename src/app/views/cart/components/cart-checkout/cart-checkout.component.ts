import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ChartService } from '../../../../services/chart/chart.service';
import { orderDetail } from '../../../../interfaces/chart/order-detail.model';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-checkout',
  imports: [CommonModule],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss',
})
export class CartCheckoutComponent implements OnInit {
  private chartService = inject(ChartService);
  orderDetails: Signal<orderDetail[]> = computed(() =>
    this.chartService.itemsCart()
  );
  totalSum: number | undefined = 0;

  constructor() {
    effect(() => console.log(this.orderDetails()));
  }
  ngOnInit() {
    this.chartService.total$.pipe(tap((x) => (this.totalSum = x))).subscribe();
  }
}
