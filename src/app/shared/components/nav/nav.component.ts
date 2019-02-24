import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public user$ = this.auth.user$;
  constructor(private auth: AuthService,
              private toastr: ToastrManager) { }

  ngOnInit() {
  }
  login() {
    this.auth.login();
    this.toastr.successToastr('logged in');

  }
  logout() {
    this.auth.logout();
    this.toastr.infoToastr('logged out');
  }
}
