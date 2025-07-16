import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

@Injectable({
  providedIn: 'root'
})
export class MockProductService {

  constructor() {}

  getProducts(): Observable<any[]> {
    return of(MOCK_PRODUCTS);
  }
}
