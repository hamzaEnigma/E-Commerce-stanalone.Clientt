import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { RegisterForm } from '../../../interfaces/user/userForm.model';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastService)
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  formSubmitted = signal(false);

  get emailControl() {
    return this.userForm.controls['email'];
  }

  get usernameControl() {
    return this.userForm.controls['username'];
  }

  get passwordControl() {
    return this.userForm.controls['password'];
  }

  async submit() {
    if (this.userForm.valid) {
      this.userService.register(this.userForm.value as RegisterForm).subscribe({
        next:(response)=>{
              this.toastService.show('Utilisateur créer avec succés');
        },
        error:(err)=>{
              console.log('erreur sign up:',err.message);          
              const errorMessage = err.error[0].description || 'An unexpected error occurred.';
              this.toastService.show('erruer:'+errorMessage);
        }
    });
    } else {
      alert('error');
    }
    console.log('user', this.userForm);
  }

  remplir() {
    this.emailControl.setValue('hamza@gmail.com');
    this.usernameControl.setValue('ha');
    this.passwordControl.setValue('123456');
  }
}
