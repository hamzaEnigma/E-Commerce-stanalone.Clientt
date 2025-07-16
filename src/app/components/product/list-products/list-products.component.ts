import { Component, inject } from '@angular/core';
import { Product } from '../../../interfaces/product/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { MockProductService } from '../../../services/mock-product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Category } from '../../../interfaces/category.model';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  products: Product[] = [];
  categories: Category[] = [];
  mockProductService = inject(MockProductService);
  searchProductFormControl: FormControl = new FormControl<string>('');
  filterPriceFormControl: FormControl = new FormControl<number>(0);
  filterCategoryFormControl: FormControl = new FormControl<string>('');
  isLoading$ = new BehaviorSubject<boolean>(false);

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.searchProductFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400)
    ),
    this.filterPriceFormControl.valueChanges.pipe(startWith(0)),
    this.filterCategoryFormControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    tap((x) => this.isLoading$.next(true)),
    switchMap(([search, price, category]) => {
      const searchData = search === null ? '' : search;
      return this.search(searchData).pipe(
        map(
          (products) =>
            products
              .filter((x) => x.purchasePrice !== undefined) // exclude the undefined values
              .filter(
                (x) =>
                  x.purchasePrice! >= price &&
                  (category === '' ||
                    x.category?.categoryName!.toLowerCase() ===
                      category.toLowerCase())
              ) // exlude the lower values
        )
      );
    }),
    delay(300),
    tap(() => this.isLoading$.next(false))
  );

  maxPurchasePrice$: Observable<number> = this.filteredProducts$.pipe(
    map((products) =>
      products.length
        ? Math.max(
            ...products
              .filter((p) => p.purchasePrice !== undefined)
              .map((p) => p.purchasePrice!)
          )
        : 0
    )
  );

  minPurchasePrice$: Observable<number> = this.filteredProducts$.pipe(
    map((products) =>
      products.length
        ? Math.min(
            ...products
              .filter((x) => x.purchasePrice !== undefined)
              .map((x) => x.purchasePrice!)
          )
        : 0
    )
  );

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories(): void {
    this.mockProductService
      .getCategories()
      .pipe(tap((items) => (this.categories = items)))
      .subscribe();
  }

  loadProducts(): void {
    this.mockProductService.getProducts().subscribe((data) => {
      if (data) {
        this.products = data;
      }
    });
  }

  search(searchData: string): Observable<Product[]> {
    const filteredData = this.products.filter((item: Product) =>
      item.productName.toLowerCase().includes(searchData.toLowerCase())
    );
    return of(filteredData);
  }

  resetFilters() {
    this.filterPriceFormControl.setValue(0);
    this.filterCategoryFormControl.setValue('');
  }

  getProductImage(item: Product): string {
    const fallbackImages = [
      'https://plus.unsplash.com/premium_photo-1707935175109-ba307d98bfe2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1668616816933-f3874102f54b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521483451569-e33803c0330c?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1637006618936-bcd4dd1911c9?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // Use image from product if exists, else fallback randomly
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
}
