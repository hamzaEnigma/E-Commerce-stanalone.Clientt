import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { RegisterForm } from '../../../interfaces/user/userForm.model';
import { User } from '../../../interfaces/user/user.model';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastService)
  formSubmitted = signal(false);
  signInForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailControl() {
    return this.signInForm.controls['userName'];
  }

  get passwordControl() {
    return this.signInForm.controls['password'];
  }

  submit() {
    this.formSubmitted.set(true);
    const loginModel:RegisterForm  = {
      userName: this.emailControl.value || undefined,
      password: this.passwordControl.value ||undefined
    }
    this.userService.loginUser(loginModel).subscribe({
      next:(res) =>{
        if (res){
        console.log('user',JSON.stringify(res as User));  
      }},
      error: (error)=>{
              console.log('erreur sign up:',error.message);          
              const errorMessage = error.error[0].description || 'An unexpected error occurred.';
              this.toastService.show('erruer:'+errorMessage);     
      }
    })
  }

  remplir() {
    this.emailControl.setValue('ha');
    this.passwordControl.setValue('123456');
  }
}
