import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Product, ProductService } from '../../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  public products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

}

