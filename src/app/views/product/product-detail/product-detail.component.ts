import { Component, inject } from '@angular/core';
import { MockProductService } from '../../../services/mock-product.service';
import { Product } from '../../../interfaces/product/product.model';
import { FormsModule } from '@angular/forms';
import { ChartService } from '../../../services/chart/chart.service';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  mockProductService = inject(MockProductService);
  loaderService = inject(LoaderService);
  chartService = inject(ChartService);
  selectedProduct:Product | undefined = undefined;
  quantity: number = 1;

  ngOnInit(): void {
    this.selectedProduct = this.mockProductService.selectedProductSignal() as Product;    
  }
  
  addToChart(p:Product){
    this.chartService
          .addToChart(p, this.quantity)
          .subscribe();
  }
}
