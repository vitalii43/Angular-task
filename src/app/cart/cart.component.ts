import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderProductsService, ProductService, Order } from '../products';
import { Observable } from 'rxjs';
import { tap, mergeMap, map, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private ordersSubscription;
  public orders$: Observable<Order[]>;
  public ordersForm: FormGroup;

  get ordersControls() {
    return this.ordersForm.get('orders') as FormArray;
  }

  constructor(
    private orderService: OrderProductsService,
    // private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.orders$ = this.orderService.getOrders();
    this.ordersForm = this.fb.group({
      orders : this.fb.array([])
    });

    this.ordersSubscription = this.orders$.pipe(
          first()
        ).subscribe(ordList => {
          ordList.forEach(ord => {
            this.ordersControls.push(this.fb.control(ord.quantity, Validators.required));
          });
        });

    this.ordersForm.valueChanges.subscribe(val => console.log(val));
  }
  removeOrder(id: number, ordId: string) {
    console.log(this.orders$);
    this.ordersControls.removeAt(id);
    this.orderService.removeOrder(ordId);
  }
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}
