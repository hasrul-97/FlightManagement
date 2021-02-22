import { Component } from '@angular/core';
import { AuthenticatorService } from './core/authenticator/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title='airline-management'

  constructor(private authenticator: AuthenticatorService, private router: Router) {

  }

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
