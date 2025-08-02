import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../interfaces/product/product.model';
import { CommonModule } from '@angular/common';
import { MockProductService } from '../../../services/mock-product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  finalize,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Category } from '../../../interfaces/product/category.model';
import { RouterLink } from '@angular/router';
import { ChartService } from '../../../services/chart/chart.service';
import { ToastService } from '../../../services/toast-service/toast.service';
import { LoaderService } from '../../../services/loader/loader.service';
import { SideBarCartComponent } from '../components/side-bar-cart/side-bar-cart.component';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,SideBarCartComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  private mockProductService = inject(MockProductService);
  cartService = inject(ChartService);
  private toastService = inject(ToastService);
  private loaderService = inject(LoaderService);
  products: Product[] = [];
  categories: Category[] = [];
  searchProductFormControl: FormControl = new FormControl<string>('');
  filterPriceFormControl: FormControl = new FormControl<number>(0);
  filterCategoryFormControl: FormControl = new FormControl<string>('');
  cartItems = this.cartService.itemsCart;

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.searchProductFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400)
    ),
    this.filterPriceFormControl.valueChanges.pipe(startWith(0)),
    this.filterCategoryFormControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    switchMap(([search, price, category]) => {
      this.loaderService.start()
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
    delay(200),
    tap(() => this.loaderService.stop())
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
    this.toastService.show('Filters initialisées');
  }

  selectProduct(p: Product) {
    this.mockProductService.selectedProductSignal.set(p);
  }

  AddToChart(item: Product) {
    this.cartService
      .addToChart(item, 1)
      .subscribe();
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'images/default-image.png';
  }
}
