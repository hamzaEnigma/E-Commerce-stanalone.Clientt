import { Component, inject } from '@angular/core';
import { Product } from '../../../../../../interfaces/product/product.model';
import { MockProductService } from '../../../../../../services/mock-product.service';
import { finalize, tap } from 'rxjs';
import { Category } from '../../../../../../interfaces/product/category.model';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product-list',
  imports: [RouterLink],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.scss',
})
export class AdminProductListComponent {
  private productService = inject(MockProductService);
  private snackBar = inject(MatSnackBar);
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
  
  deleteProduct(p: Product): void {
    this.productService
      .delete(p)
      .pipe(
        tap(() => {
          this.snackBar.open('❌ Produit supprimé', 'Fermer', {
            duration: 2000,
          });
        }),
        finalize(() => this.loadProducts())
      )
      .subscribe();
  }
}
