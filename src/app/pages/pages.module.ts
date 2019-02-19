import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageWrapComponent } from './page-wrap/page-wrap.component';
import { ProductsModule } from '../products/products.module';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../products';

@NgModule({
  declarations: [
    HomeComponent, 
    AllProductsComponent, 
    ProductDetailsComponent, 
    PageWrapComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ProductsModule,
    SharedModule
  ],
  providers:[
    ProductService
  ]
})
export class PagesModule { }
