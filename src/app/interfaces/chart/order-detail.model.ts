import { Product } from "../product/product.model";

export interface orderDetail {
    orderDetailId?:number;
    OrderId?: number;
    productId?: number
    Quantity: number;
    Discount?: number;
    SalePrice:number;
    product?:Product
    sumItems?:number;
}