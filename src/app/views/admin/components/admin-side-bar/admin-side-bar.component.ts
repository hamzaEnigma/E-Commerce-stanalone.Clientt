import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  imports: [RouterLink,RouterLinkActive],
  template: `
    <div class="card d-flex flex-column gap-1">
       <a routerLink="products" routerLinkActive="active-link" >Products</a>
      <a routerLink="categories" routerLinkActive="active-link">Categories </a>
    </div>
  `,
  styles: `:host {
    display: flex;
    flex: 1 1 auto;
    height:100%;
    .card {
      flex: 1 1 auto;
    }

    a{
      padding: 8px 12px;
      border-radius: 13px;
      font-weight: bold;
      color:black;
      cursor: pointer;
      width: 100%;
      text-decoration: none;
    }
    .active-link{
      background-color: #e47911
    }
}`,
})
export class AdminSideBarComponent {}
