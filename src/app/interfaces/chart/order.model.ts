import { orderDetail } from "./order-detail.model";

export interface Order {
    orderId?:number;
    orderDate?:Date;
    customerId?:number;
    customerName?:string;
    status?:string;
    orderDetails:orderDetail[];
    totalAmount?:number;
}