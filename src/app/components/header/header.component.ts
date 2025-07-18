import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChartService } from '../../services/chart/chart.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(ChartService);
  panierCount: Signal<number> = computed(() => this.cartService.itemCartSignal().length);

  ngOnInit(){
  }
}
