import { Product } from "../product/product.model";

export interface orderDetail {
    OrderId?: number;
    productId?: number
    Quantity: number;
    Discount?: number;
    SalePrice:number;
    product?:Product
    sumItems?:number;
}