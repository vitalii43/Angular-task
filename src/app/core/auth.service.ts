import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {

  private user = new BehaviorSubject<boolean>(false);
  public user$: Observable<boolean> = this.user.asObservable();

  constructor(private activatedRouter: ActivatedRoute, private route: Router) {
  }

  public login() {
    this.user.next(true);
  }
  public logout() {
    console.log(this.activatedRouter, this.route);
    this.user.next(false);
    if (this.route.url === '/cart') {
      this.route.navigate(['/']);
    }
  }

}
