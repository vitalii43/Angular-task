import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule
  ],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
