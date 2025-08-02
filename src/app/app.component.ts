import { ApplicationRef, Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastAlertComponent } from './components/toast-alert/toast-alert.component';
import { LoaderService } from './services/loader/loader.service';
import { LoaderComponent } from "./components/loader/loader.component";
import { delay, filter, finalize, first, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ToastAlertComponent,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private appRef = inject(ApplicationRef);

  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.router.events.pipe(
    filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
    ).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.start();
      } else if (event instanceof NavigationEnd) {
        this.appRef.isStable
          .pipe(first((isStable) => isStable === true))
          .subscribe(() => this.loader.stop());
      }
      });
  }

  get isLoading() {
    return this.loader.loading();
  }
}
