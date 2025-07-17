import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Category } from '../interfaces/category.model';
import { MOCK_categories } from '../mocks/categories.mock';
import { Product } from '../interfaces/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  selectedProduct: Product | undefined;
  selectedProductSignal =  signal({});
  constructor() {}

  getProducts(): Observable<any[]> {
    return of(MOCK_PRODUCTS);
  }
  getCategories(): Observable<Category[]> {
    return of(MOCK_categories);
  }
}
