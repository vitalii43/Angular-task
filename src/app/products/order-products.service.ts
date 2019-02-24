import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './entities';

@Injectable()
export class OrderProductsService {
  private orders = JSON.parse(localStorage.getItem('orders')) || [];
  constructor() { }

  orderProduct(orderData){
    this.orders.push(orderData);
    console.log(this.orders)
    localStorage.setItem('orders', JSON.stringify(this.orders))
  }
  getOrders():Observable<Order[]>{
    return of(JSON.parse(localStorage.getItem('orders')))
  }
}
