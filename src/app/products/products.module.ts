import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { CardComponent } from './card/card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ 
    FilterProductsComponent, 
    OrderProductComponent,
    CardComponent,
    CardsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CardsContainerComponent,
    FilterProductsComponent,
    OrderProductComponent
  ]
})
export class ProductsModule { }
