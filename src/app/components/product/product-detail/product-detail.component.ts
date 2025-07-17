import { Component, inject } from '@angular/core';
import { MockProductService } from '../../../services/mock-product.service';
import { Product } from '../../../interfaces/product/product.model';
import { FormsModule } from '@angular/forms';
import { ChartService } from '../../../services/chart/chart.service';
import { orderDetail } from '../../../interfaces/chart/order-detail.model';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  mockProductService = inject(MockProductService);
  chartService = inject(ChartService);
  selectedProduct:Product | undefined = undefined;
  quantity: number = 1;

  ngOnInit(): void {
    this.selectedProduct = this.mockProductService.selectedProductSignal() as Product;    
  }
  
  addToChart(p:Product){
    const order:orderDetail = {
    product: this.selectedProduct,
    OrderId: undefined,
    productId: this.selectedProduct?.productId,
    Quantity: this.quantity,
    SalePrice: 0
  }
    this.chartService.addToChart(order);
  }
}
