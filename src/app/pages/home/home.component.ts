import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public featureProducts: Observable<Product[]>;
  constructor(private prodService: ProductService) {

  }
  ngOnInit() {
    this.featureProducts = this.prodService.getFeatureProducts();
  }
}
