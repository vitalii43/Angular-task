import { Injectable } from '@angular/core';
import { Product } from './entities';
import { Observable, from, of, empty } from 'rxjs';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return empty();
  }

}
