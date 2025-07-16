import { Component, inject } from '@angular/core';
import { Product } from '../../../interfaces/product/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { MockProductService } from '../../../services/mock-product.service';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  products: Product[] = [];
  private productService = inject(ProductService);
  private mockProductService = inject(MockProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.mockProductService.getProducts().subscribe((data) => {
      if (data) {
        this.products = data;
      }
    });
  }
}
