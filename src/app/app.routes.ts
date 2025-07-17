import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/product/list-products/list-products.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart/cart.component';

export const routes: Routes = [
      { path: '', component: ListProductsComponent },
      { path: 'product/details', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
];
