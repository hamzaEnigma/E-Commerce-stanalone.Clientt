import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Category } from '../interfaces/category.model';
import { MOCK_categories } from '../mocks/categories.mock';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  constructor() {}

  getProducts(): Observable<any[]> {
    return of(MOCK_PRODUCTS);
  }
  getCategories(): Observable<Category[]> {
    return of(MOCK_categories);
  }
}
