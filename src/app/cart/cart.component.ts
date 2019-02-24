import { Component, OnInit } from '@angular/core';
import { OrderProductsService, ProductService, Order } from '../products';
import { Observable } from 'rxjs';
import { tap, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderProductsService,
    // private productService: ProductService
  ) { }

  ngOnInit() {
    console.log('lol');
    this.orders$ = this.orderService.getOrders();
  }

}
