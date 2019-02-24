import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService} from '../../products';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrderProductsService } from 'src/app/products/order-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  
  private authSubscr;
  private routeSubscr: any;
  private user: boolean;

  public interestingProducts: Observable<Product[]>;
  public product: Observable<Product>;
  
  public orderForm: FormGroup;

  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastrManager,
              private orderService: OrderProductsService) { }

  submitOrder(){
    console.log(this.orderForm.value)
    if(!this.user) { this.toastr.errorToastr('you must be logged in') }
    else{
      this.orderService.orderProduct(this.orderForm.value)
    }
  }

  ngOnInit() {
    this.interestingProducts = this.productService.getInterestedInProducts();
    this.routeSubscr = this.activeRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.product = this.productService.getProductDetails(id);
      console.log(this.product);
    });

    this.orderForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      color: ['', Validators.required],
      icon: ['', Validators.required],
      price: ['', Validators.required],
      name: ['', Validators.required], 
    })

    this.authSubscr = this.auth.user$.subscribe((user:boolean)=>{
      console.log(user)
      this.user = user;
    })
  }
  ngOnDestroy() {
    this.routeSubscr.unsubscribe();
  }
}
