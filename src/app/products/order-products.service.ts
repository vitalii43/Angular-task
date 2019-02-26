import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Order } from './entities';

@Injectable()
export class OrderProductsService {
  private ordersSubject = new BehaviorSubject<Order[]>(
    JSON.parse(localStorage.getItem('orders')) || []);
  public orders$ = this.ordersSubject.asObservable();

  constructor() { }

  orderProduct(orderData) {
    const newOrders = this.ordersSubject.value;
    newOrders.push({...orderData, orderId: '_' + Math.random().toString(36).substr(2, 9)});
    localStorage.setItem('orders', JSON.stringify(newOrders));
    this.ordersSubject.next(newOrders);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  removeOrder(id: string) {
    const newOrders = this.ordersSubject.value;
    const removeIndx = newOrders.findIndex(item => item.orderId === id);
    newOrders.splice(removeIndx, 1);

    this.ordersSubject.next(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  }

  updateOrders(quantList) {
    const newOrders = this.ordersSubject.value;
    newOrders.forEach((val, idx) => {
      val.quantity = quantList[idx];
    });
    localStorage.setItem('orders', JSON.stringify(newOrders));
    this.ordersSubject.next(newOrders);
  }
}
