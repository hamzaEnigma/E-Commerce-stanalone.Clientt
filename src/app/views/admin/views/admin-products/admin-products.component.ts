import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-consult-products',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  
      <div class="d-flex flex-column gap-3">

        <div class="d-flex gap-2 mb-3">
          <a class="" routerLink="list" routerLinkActive="active-link" >liste</a>
          <a class="" routerLink="add" routerLinkActive="active-link">nouveau</a>
        </div>

        <div class="form-area">
          <router-outlet/>
        </div>
      </div>
  `,
  styles: `:host{
    a{
      padding: 8px 12px;
      border-radius: 13px;
      font-weight: bold;
      color:black;
      cursor: pointer;
      width: 100%;
      text-decoration: none;
      width:100px;
    }
    
    .active-link{
      background-color: #e47911
    }
  }`
})
export class AdminConsultProductsComponent {

}
