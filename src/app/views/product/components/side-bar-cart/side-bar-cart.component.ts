import { Component, inject } from '@angular/core';
import { ChartService } from '../../../../services/chart/chart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar-cart',
  imports: [CommonModule],
  templateUrl: './side-bar-cart.component.html',
  styleUrl: './side-bar-cart.component.scss'
})
export class SideBarCartComponent {
  cartService = inject(ChartService);
  cartItems = this.cartService.itemsCart;
}
