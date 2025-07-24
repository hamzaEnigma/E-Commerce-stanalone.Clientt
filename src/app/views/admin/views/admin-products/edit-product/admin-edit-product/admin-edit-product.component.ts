import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductService } from '../../../../../../services/mock-product.service';
import { Category } from '../../../../../../interfaces/product/category.model';
import { forkJoin, Observable, tap } from 'rxjs';
import { Product } from '../../../../../../interfaces/product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.scss'
})
export class AdminEditProductComponent {
private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private mockService = inject(MockProductService);

  productForm: FormGroup;
  categories: Category[] = [];

  constructor() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      unitsInStock: [0, [Validators.min(0)]],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin<{categories:Observable<Category[]> , product :   Observable<Product | undefined> }>({
    categories: this.mockService.getCategories(),
    product: this.mockService.getProductById(id)
  }).subscribe(({ categories, product })=> {
    this.categories = categories;
    if (product)
    this.productForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      categoryId: product.categoryId ?? product.category?.categoryId ?? '',
      purchasePrice: product.purchasePrice,
      unitsInStock: product.unitsInStock,
      description: product.description,
      imageUrl: product.imageUrl
    });
  });
  }

  onSubmit() {
    console.log('form value:',this.productForm.value);
    
    if (this.productForm.valid) {
      this.mockService.update(this.productForm.value).subscribe(() => {
        this.router.navigate(['/admin/products/list']);
      },);
    }else {
      alert('error')
    }
  }
}
