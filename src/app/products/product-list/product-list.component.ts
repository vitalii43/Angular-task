import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/entities';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

}
