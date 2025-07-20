import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoriesListComponent } from './views/admin-categories/categories-list/admin-categories-list/admin-categories-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'categories',
        component: AdminCategoriesListComponent,
      },
      {
        path: 'products',
        loadChildren: async () =>
          (await import('./views/admin-products/admin-product.routes'))
            .routes,
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
];