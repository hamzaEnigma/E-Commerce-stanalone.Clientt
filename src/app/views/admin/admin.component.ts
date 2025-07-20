import { Component } from '@angular/core';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import {RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-consult',
  imports: [AdminSideBarComponent, RouterOutlet],
  template: `
      <app-admin-side-bar></app-admin-side-bar>
      <div class="card col-md-10">
          <router-outlet/>
      </div>
  `,
  styles: `
   :host {
     display: flex;
     flex: 1 1 auto;
     height: 600px;
     gap: 20px; 
 }
  `,
})
export class AdminComponent {}
