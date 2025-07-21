import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Category } from '../interfaces/product/category.model';
import { MOCK_categories } from '../mocks/categories.mock';
import { Product } from '../interfaces/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  selectedProduct: Product | undefined;
  selectedProductSignal = signal({});
  MOCK_PRODUCTS = MOCK_PRODUCTS;
  constructor() {}

  getProducts(): Observable<any[]> {
    return of(this.MOCK_PRODUCTS);
  }
  
  getCategories(): Observable<Category[]> {
    return of(MOCK_categories);
  }

  create(product: Product): Observable<boolean> {
    product.productId =
      Math.max(...this.MOCK_PRODUCTS.map((x) => x.productId)) + 1;
    this.MOCK_PRODUCTS.push(product);
    return of(true);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.MOCK_PRODUCTS.find((p) => p.productId === id));
  }

  update(product: Product): Observable< boolean> {
    const index = this.MOCK_PRODUCTS.findIndex(
      (p) => p.productId === product.productId
    );
    if (index !== -1) {
      this.MOCK_PRODUCTS[index] = product;
    }
    return of(true);
  }

  delete(product:Product):Observable<boolean> {
    const index = this.MOCK_PRODUCTS.findIndex(x=>x.productId === product.productId)
    this.MOCK_PRODUCTS.splice(index,1);
    return of(true)
  }
}
