import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegment, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotExpr } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';
import { first, tap } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
 constructor(private auth: AuthService,
             private toastr: ToastrManager ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.user$.pipe(
      first(),
      tap((val: boolean) => {
        console.log(val);
        if (!val) {
          this.toastr.errorToastr('you must login');
        }
      })
    );
  }
  canLoad( route: Route,
           segments: UrlSegment[] ): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.auth.user$);
      return this.auth.user$.pipe(
          first(),
          tap((val: boolean) => {
            console.log(val);
            if (!val) {
              this.toastr.errorToastr('you must login');
            }
          })
        );
  }

}
