import { Routes } from '@angular/router';
import { AdminProductListComponent } from './list-products/admin-product-list/admin-product-list.component';
import { AdminConsultProductsComponent } from './admin-products.component';
import { AdminProductNewComponent } from './new-product/admin-product-new/admin-product-new.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminConsultProductsComponent,
    children: [
      {
        path: 'list',
        component: AdminProductListComponent,
      },
      {
        path: 'add',
        component: AdminProductNewComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
