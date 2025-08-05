import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ChartService } from '../../../../services/chart/chart.service';
import { orderDetail } from '../../../../interfaces/chart/order-detail.model';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../services/order/order.service';
import { Order } from '../../../../interfaces/chart/order.model';

@Component({
  selector: 'app-cart-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss',
})
export class CartCheckoutComponent implements OnInit {
  private chartService = inject(ChartService);
  private orderService = inject(OrderService);
  orderDetails: Signal<orderDetail[]> = computed(() =>
    this.chartService.itemsCart()
  );
  orderForm: FormGroup;
  totalSum: number | undefined = 0;
  orders$: Observable<Order[]> = this.orderService.orders$;

  constructor(private fb: FormBuilder) {
    effect(() => {
      this.orders$.pipe(tap((res) => console.log('order:', res))).subscribe();
      console.log('order details :', this.orderDetails());
      console.log('form value :', this.orderForm.value);
    });

    this.orderForm = this.fb.group({
      orderId: [null],
      orderDate: [null],
      customerId: [null],
      customerName: [null, [Validators.required]],
      status: ['En cours'],
    });
  }

  ngOnInit() {
    this.chartService.total$.pipe(tap((x) => (this.totalSum = x))).subscribe();
  }
  onSubmit() {
    const formValue =  this.orderForm.value;

    const order:Order = {
    orderDate: new Date(),
    customerId: 1, // tu peux le remplir si tu as un ID client
    customerName: formValue.customerName, // ou combine prénom + nom si séparés
    status: formValue.status,
    totalAmount: this.totalSum,
    orderDetails: this.orderDetails()
    }
    this.orderService.create(order).subscribe();
  }

  submitForm() {
  if (this.orderForm.valid) {
     this.onSubmit(); // appelle manuellement ta méthode de soumission
  } else {
    this.orderForm.markAllAsTouched(); // affiche les erreurs si formulaire invalide
  }    
  }
}
