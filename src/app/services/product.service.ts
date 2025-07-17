import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl ='https://localhost:7228/api/Product/';
  selectedProduct: Product | undefined;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+'GetAll'+'?includeCategory=true');
  }

  getProductById(id:number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl+id+'?includeCategory=true');
  }
}
