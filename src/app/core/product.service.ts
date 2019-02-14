import { Injectable } from '@angular/core';
import { Product, productList } from './entities/product-list';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(productList);
  }

}
