import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { CardComponent } from './card/card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderProductsService } from './order-products.service';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    FilterProductsComponent,
    CardComponent,
    CardsContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardsContainerComponent,
    FilterProductsComponent,
  ],
  providers: [
    OrderProductsService,
    ProductService
  ]
})
export class ProductsModule { }
