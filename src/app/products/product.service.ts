import { Injectable } from '@angular/core';
import { Product, FilterDetails } from './entities';
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

  getProductDetails(id: string): Observable<Product> {
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
        let newList = prodList;

        if (filterInfo.minPrice) {
            newList = newList.filter( (item: Product) => item.price >= filterInfo.minPrice );
          }
        if (filterInfo.maxPrice) {
            newList = newList.filter( (item: Product) => item.price <= filterInfo.maxPrice );
          }
        if ( filterInfo.color !== 'all' && filterInfo.color !== '' ) {
            newList = newList.filter( (item: Product) => item.color.indexOf(filterInfo.color) !== -1 );
          }

        return newList;
      })
    );
  }

}
