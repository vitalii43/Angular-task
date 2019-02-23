import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageWrapComponent } from './page-wrap/page-wrap.component';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: '../cart/cart.module#CartModule',
    canLoad: [AuthGuard]
  },
  {
    path: '',
    component: PageWrapComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: AllProductsComponent
          },
          {
            path: ':id',
            component: ProductDetailsComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
