import { Injectable } from '@angular/core';
import { Product, FilterDetails } from './entities';
import { Observable, from, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, elementAt, min } from 'rxjs/operators';

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
        return arr.filter(elem => elem.feature);
      })
    );
  }

  getInterestedInProducts(): Observable<Product[]> {
    return this.products.pipe(
      map( arr => {
        return arr.filter( elem => elem.interesting);
      })
    );
  }

  getProductDetails(id: number): Observable<Product> {

    console.log(id);
    return this.products.pipe(
      map( arr => {
        return arr.find( elem => elem.id === id );
      })
    );
  }

  filterProducts(filterInfo: FilterDetails): Observable<Product[]> {

    return this.products.pipe(
      map((prodList: Product[]) => {
        console.log(filterInfo);
        let { minPrice, maxPrice, color} = filterInfo;

        if ( !minPrice ) { minPrice = 0; }
        if ( !maxPrice ) { maxPrice = Number.MAX_SAFE_INTEGER; }
        if ( !color ) { color = 'all'; }

        return prodList.filter( item => item.price > minPrice && item.price < maxPrice )
                       .filter( item => item.color.includes(color) || color === 'all' );
      })
    );
  }

}
