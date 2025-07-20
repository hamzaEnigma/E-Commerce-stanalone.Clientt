import { Component, inject } from '@angular/core';
import { Product } from '../../../../../../interfaces/product/product.model';
import { MockProductService } from '../../../../../../services/mock-product.service';
import { tap } from 'rxjs';
import { Category } from '../../../../../../interfaces/product/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-product-list',
  imports: [RouterLink],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.scss',
})
export class AdminProductListComponent {
  private productService = inject(MockProductService);
  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService
      .getCategories()
      .pipe(tap((items) => (this.categories = items)))
      .subscribe();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      if (data) {
        this.products = data;
      }
    });
  }
}
