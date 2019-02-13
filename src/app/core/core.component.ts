import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { Observable } from 'rxjs';
import { Product } from './shared/product-list';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  products: Observable<Product[]>;
  constructor(private productService: ProductService ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
