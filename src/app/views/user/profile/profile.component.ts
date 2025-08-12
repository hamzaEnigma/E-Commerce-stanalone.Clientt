import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private userService = inject(UserService);
  user$: Observable<User | undefined> = this.userService.currentUser$;
  constructor() {
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'images/default-image.png';
  }
}
