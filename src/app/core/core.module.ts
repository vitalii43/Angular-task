import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],

})
export class CoreModule { }
