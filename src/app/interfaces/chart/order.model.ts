import { User } from "../user/user.model";
import { orderDetail } from "./order-detail.model";

export interface Order {
    orderId?:number;
    orderDate?:Date;
    customerId?:string;
    customerName?:string;
    status?:string;
    orderDetails?:orderDetail[];
    totalAmount?:number;
    user?:User;
}