import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NavComponent, FooterComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ProductService],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class CoreModule { }
