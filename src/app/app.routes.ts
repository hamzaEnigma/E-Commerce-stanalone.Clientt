import { Routes } from '@angular/router';
import { ListProductsComponent } from './views/product/list-products/list-products.component';

export const routes: Routes = [
  { path: 'products', component: ListProductsComponent },
  {
    path: 'product/details',
    loadComponent: async () =>
      (
        await import('./views/product/product-detail/product-detail.component')
      ).ProductDetailComponent,
  },
  {
    path: 'cart',
    loadComponent: async () =>
      (await import('./views/cart/cart.component')).CartComponent,
  },
  {
    path:'checkout',
    loadComponent : async () => 
      (await import('./views/cart/components/cart-checkout/cart-checkout.component')).CartCheckoutComponent,
    
  },
  {
    path: 'admin',
    loadChildren: async () =>
      (await import('./views/admin/admin.routes')).routes,
  },

  { path: '', pathMatch: 'full', redirectTo: 'products' },
];
