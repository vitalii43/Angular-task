import { Component, OnInit } from '@angular/core';
import {Product} from '../../core/entities';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/core/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Observable<Product[]>;
  constructor(private prodService: ProductService) {

  }
  ngOnInit() {
    this.products = this.prodService.getFeatureProducts();
  }
}
