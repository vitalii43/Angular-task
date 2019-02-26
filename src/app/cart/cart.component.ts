import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderProductsService, ProductService, Order } from '../products';
import { Observable } from 'rxjs';
import { tap, mergeMap, map, first, reduce } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private ordersSubscription;
  private ordersFormSbscr;
  public orders$: Observable<Order[]>;
  public totalPrice;
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

    this.orders$ = this.orderService.getOrders().pipe(
      tap(orders => {
        let total = 0;
        orders.forEach((item) => {
          total += item.price * item.quantity;
        });
        this.totalPrice = total;
      })
    );

    this.ordersForm = this.fb.group({
      orders : this.fb.array([])
    });

    this.ordersSubscription = this.orders$.pipe(
          first()
        ).subscribe(ordList => {
          ordList.forEach(ord => {
            this.ordersControls.push(this.fb.control(ord.quantity, [Validators.required, Validators.pattern(/^[0-9]*$/)]));
          });
        });

    this.ordersFormSbscr = this.ordersForm.valueChanges.subscribe(val => {
     if (this.ordersForm.valid) {
        this.orderService.updateOrders(val.orders);
      }
    });

  }

  removeOrder(id: number, ordId: string) {

    this.orderService.removeOrder(ordId);
    this.ordersControls.removeAt(id);
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
    this.ordersFormSbscr.unsubscribe();
  }
}
