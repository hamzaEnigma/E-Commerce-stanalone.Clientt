import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-consult-products',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  
      <div class="d-flex flex-column gap-3">

        <div class="d-flex gap-2 mb-3">
          <a class="btn btn-primary" routerLink="list" routerLinkActive="router-link-active" >liste</a>
          <a class="btn btn-primary" routerLink="add" routerLinkActive="router-link-active">nouveau</a>
        </div>

        <div class="form-area">
          <router-outlet/>
        </div>
      </div>
  `,
  styles: `:host{
    a{
      width: 100px;
    }
  }`
})
export class AdminConsultProductsComponent {

}
