import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from './core/authenticator/authenticator.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './shared/state-management/user.model';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Airline-Staff';

  constructor(public authenticator: AuthenticatorService, private router: Router) {
    // this.user = store.pipe(select('user'));
  }

  user: Observable<User[]>

  ngOnInit() {
    this.checkAccess();
  }

  checkAccess() {
    if (this.authenticator.isLoggedIn) {
      if (this.authenticator.userRole === 'user')
        this.router.navigateByUrl('user/home');
      else if (this.authenticator.userRole === 'admin')
        this.router.navigateByUrl('admin/home');
    }
    else {
      this.router.navigateByUrl('');
    }
  }
}
