import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChartService } from '../../services/chart/chart.service';
import { Observable, tap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(ChartService);
  private auth = inject(UserService);
  panierCount: Signal<number> = computed(() => this.cartService.itemsCart().length);
  isLoggedIn$: Observable<boolean> = this.auth.authChanged$;

  ngOnInit(){
  }

  logout(){
    this.auth.logOut();
    console.log('user deconnecté');
  }
}
