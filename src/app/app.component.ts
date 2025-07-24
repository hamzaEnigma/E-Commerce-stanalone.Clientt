import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastAlertComponent } from './components/toast-alert/toast-alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,ToastAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
