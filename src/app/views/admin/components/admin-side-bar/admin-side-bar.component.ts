import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  imports: [RouterLink,RouterLinkActive],
  template: `
    <div class="card d-flex flex-column gap-3">
       <a routerLink="products" routerLinkActive="active-link" class="btn btn-primary p-2">Products</a>
      <a routerLink="categories" routerLinkActive="active-link" class="btn btn-primary p-2">Categories </a>
    </div>
  `,
  styles: `:host {
    display: flex;
    flex: 1 1 auto;
    height:100%;
    .card {
      flex: 1 1 auto;
    }
}`,
})
export class AdminSideBarComponent {}
