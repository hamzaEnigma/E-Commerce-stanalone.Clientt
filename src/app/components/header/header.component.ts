import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartService } from '../../services/chart/chart.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(ChartService);
  count = 0;
  
  ngOnInit(){
    this.cartService.cartItems$.pipe(tap((items)=>this.count= items.length)).subscribe();
  }
}
