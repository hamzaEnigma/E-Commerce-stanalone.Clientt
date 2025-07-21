import { CommonModule } from '@angular/common';
import { Component, inject, isStandalone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../../interfaces/product/category.model';
import { MockProductService } from '../../../../../../services/mock-product.service';
import { tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-product-new',
  standalone: true,
  imports: [MatSnackBarModule,ReactiveFormsModule,CommonModule],
  templateUrl: './admin-product-new.component.html',
  styleUrl: './admin-product-new.component.scss',
})
export class AdminProductNewComponent {
  private mockService = inject(MockProductService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  productForm: FormGroup;
  formValue :any;
  categories: Category[]= [];
  previewUrl :any;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productId: [null],
      productName: ['', Validators.required],
      categoryId:['',Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      unitsInStock: [0, [Validators.min(0)]],
      description:[''],
      imageUrl: ['']
    });
  }
  ngOnInit(){
   this.mockService.getCategories().pipe(tap((x)=>this.categories =x )).subscribe();
   console.log('categories',this.categories);
   
  }
  onSubmit(){
    if (this.productForm.valid){
      this.mockService.create(this.productForm.value).subscribe(()=>{
            this.snackBar.open('✅ Produit créé avec succès !', 'Fermer', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.router.navigate(["/admin/products/list"])
      })
    }
  }
}
