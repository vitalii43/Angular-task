import { Injectable } from '@angular/core';
import { Product } from './entities';
import { Observable, from, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, elementAt } from 'rxjs/operators';

@Injectable()
export class ProductService {

  private api = 'http://my-json-server.typicode.com/vitalii43/angular-task';
  private products = this.http.get<Product[]>(`${this.api}/products`);

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.products;
  }

  getFeatureProducts(): Observable<Product[]> {
    return this.products.pipe(
      map( arr => {
        return arr.slice(0, 4);
      })
    );
  }

  getInterestedInProducts(): Observable<Product[]> {
    return this.products.pipe(
      map( arr => {
        return arr.slice(0, 4);
      })
    );
  }

  getProductDetails(id: number): Observable<Product> {
    console.log(id);
    return this.products.pipe(
      mergeMap(arr => arr),
      elementAt(id)
    );
  }


}
