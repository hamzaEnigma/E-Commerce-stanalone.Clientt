import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/chart/order.model';
import { MOCK_ORDERS } from '../../mocks/orders.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [...MOCK_ORDERS];
  private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  orders$ = this.ordersSubject.asObservable();

  constructor() { }

  getAll(): Observable<Order[]> {
    return of(this.orders);
  }

  create(order: Order): Observable<number> {
    const nextId = this.orders.length > 0 ? Math.max(...this.orders.map(o => o.orderId?? 0)) + 1 : 1;
    order.orderId = nextId;
    this.orders.push(order);
    this.ordersSubject.next(this.orders);
    return of(order.orderId);
  }
}
