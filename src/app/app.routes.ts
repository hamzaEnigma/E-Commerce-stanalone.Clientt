import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/product/list-products/list-products.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CartComponent } from './views/cart/cart.component';

export const routes: Routes = [
  { path: 'products', component: ListProductsComponent },
  {
    path: 'product/details',
    loadComponent: async () =>
      (
        await import(
          './components/product/product-detail/product-detail.component'
        )
      ).ProductDetailComponent,
  },
  {
    path: 'cart',
    loadComponent: async () =>
      (await import('./views/cart/cart.component')).CartComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'products' },
];
