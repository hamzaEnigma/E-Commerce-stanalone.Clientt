import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ToastService } from '../../../../services/toast-service/toast.service';
import { map, Observable, take } from 'rxjs';
import { User } from '../../../../interfaces/user/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  user$: Observable<User | undefined> = this.userService.currentUser$;
  user: User | undefined;
  formSubmitted = signal(false);
  accountForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^\+?\d[\d\s.-]{6,}$/)],
    ],
  });

  ngOnInit(): void {
    this.remplir();
  }

  get firstNameControl() {
    return this.accountForm.controls['firstName'];
  }

  get lastNameControl() {
    return this.accountForm.controls['lastName'];
  }

  get emailControl() {
    return this.accountForm.controls['email'];
  }

  get phoneNumberControl() {
    return this.accountForm.controls['phoneNumber'];
  }

  remplir() {
    this.user$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.user = res;
        this.firstNameControl.setValue(res.firstName ?? 'Hamza');
        this.lastNameControl.setValue(res.lastName ?? 'Somai');
        this.emailControl.setValue(res.email ?? null);
        this.phoneNumberControl.setValue(res.phoneNumber ?? '0615388242');
      }
    });
  }

  submit() {
    this.formSubmitted.set(true);
    if (this.accountForm.valid) {
      const userUpdated: User = {
        ...this.user,
        firstName: this.firstNameControl.value || undefined,
        lastName: this.lastNameControl.value || undefined,
        phoneNumber: this.phoneNumberControl.value || undefined,
      };
      this.userService.updateUser(userUpdated).subscribe({
        next: (res) => {
          if (res) {
            this.toastService.show('utilisateur modifié');
            console.log('utlisateur modifié');
          }
        },
        error: (error) => {
          console.log('erreur changement de profil:', error.message);
          const errorMessage =
            error.error[0].description || 'An unexpected error occurred.';
          this.toastService.show('erruer:' + errorMessage);
        },
      });
    } else {
      alert('erreur')
    }
  }
}
