import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { ChartService } from '../../../../services/chart/chart.service';
import { orderDetail } from '../../../../interfaces/chart/order-detail.model';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../services/order/order.service';
import { Order } from '../../../../interfaces/chart/order.model';
import { CartItemsComponent } from "../cart-items/cart-items.component";
import { User } from '../../../../interfaces/user/user.model';
import { ToastService } from '../../../../services/toast-service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss',
})
export class CartCheckoutComponent {
  private chartService = inject(ChartService);
  private orderService = inject(OrderService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  orderDetails: Signal<orderDetail[]> = computed(() =>  this.chartService.itemsCart() );
  userForm: FormGroup;
  totalSum: number | undefined = 0;
  orders$: Observable<Order[]> = this.orderService.orders$;
  formSubmitted = signal(false);

  constructor(private fb: FormBuilder) {
    this.chartService.total$
      .pipe(tap((x) => (this.totalSum = x)))
      .subscribe((total) =>
        console.log('-------START  chechkout : total ---------', total)
      );

    effect(() => {
      console.log('------- orderDetails ---------', this.orderDetails());
      console.log('------- END ---------');
    });

    this.userForm = this.fb.group({
      account: this.fb.group(
        {
          userName: ['hamza', Validators.required],
          email: ['hamzasomai@gmail.com', [Validators.required, Validators.email]],
          password: ['123456', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['123456', Validators.required],
        },
        {
          validators: this.passwordMatchValidator,
        }
      ),
      details: this.fb.group({
        phoneNumber: ['0615388242',Validators.required],
        firstName: ['hamza',Validators.required],
        lastName: ['somai',Validators.required],
      }),
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  fillModel() {
    const userToCreate : User = {
    userName:this.usernameControl.value ?? undefined,
    password: this.passwordControl.value ?? undefined,
    email:this.emailControl.value ?? undefined,
    phoneNumber:this.phoneNumberControl?.value ?? undefined,
    firstName:this.firstNameControl?.value ?? undefined,
    lastName:this.lastNameControl?.value ?? undefined
    }
    const order : Order = {
        orderDate: new Date(),
        user:userToCreate,
        orderDetails:this.orderDetails()
    }
    this.orderService.createOrder(order).subscribe({
     next:(response)=>{
              this.toastService.show('Commande créer avec succés');
              this.router.navigate(['/profile'])
        },
        error:(err)=>{
              console.log('erreur creation commande:',err.message);          
              const errorMessage = err.error[0].description || 'An unexpected error occurred.';
              this.toastService.show('erruer:'+errorMessage);
        }
      }
    );
  }

  submitForm() {
    if (this.userForm.valid) {
      this.fillModel(); // appelle manuellement ta méthode de soumission
    } else {
      this.userForm.markAllAsTouched(); // affiche les erreurs si formulaire invalide
    }
  }

  get usernameControl() {
    return this.userForm.get('account.userName')!;
  }

  get emailControl() {
    return this.userForm.get('account.email')!;
  }

  get passwordControl() {
    return this.userForm.get('account.password')!;
  }

  get confirmPasswordControl() {
    return this.userForm.get('account.confirmPassword')!;
  }

  ///  details /// 
  get firstNameControl() {
    return this.userForm.get('details.firstName');
  }

  get lastNameControl() {
    return this.userForm.get('details.lastName');
  }

  get phoneNumberControl() {
    return this.userForm.get('details.phoneNumber');
  }

}
