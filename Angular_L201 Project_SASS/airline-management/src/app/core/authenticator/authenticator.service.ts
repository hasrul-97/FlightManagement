import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialUser, AuthService } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(public authService: AuthService, public http: HttpClient, private router: Router) {
  }

  // VARIABLE DECLARATIONS
  public user: SocialUser;
  public isLoggedIn: boolean;
  public userRole = 'user';
  public data: any[] = [];
  public userToken = '';
  public email = '';

  //  THIS METHOD IS USED TO RENDER THE GOOGLE LOGIN SCREEN AND INITIATE THE LOGIN PROCESS
  async GoogleLogin() {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    if (this.user != null) {
      this.email = this.user.email;
      this.checkIfUserIsRegistered(this.user.email);
    }
  }

  //  THIS METHOD IS USED TO CHECK IF THE USER IS ALREADY PRESENT IN OUR DATABASE
  checkIfUserIsRegistered(email) {
    this.http.get(environment.apiUrl + 'Admin/CheckIfUserIsPresent?email=' + email).subscribe((data: any) => {
      this.data = data.dataList;
      if (this.data.length === 0) {
        this.router.navigateByUrl('register');
      } else {
        this.isLoggedIn = true;
        this.userRole = this.data[0].role;
        if (this.userRole === 'User' || this.userRole === 'user') {
          this.router.navigateByUrl('user');
        } else if (this.userRole === 'Admin' || this.userRole === 'admin') {
          this.router.navigateByUrl('admin');
        }
      }
    });
  }

  //  THIS METHOD IS USED TO SIGN OUT
  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('');
    this.isLoggedIn = false;
  }

  makeAdmin() {
    return this.http.post(environment.apiUrl + 'Admin/MakeUserAdmin?email=' + this.user.email, null);
  }

  revokeAdmin() {
    return this.http.post(environment.apiUrl + 'Admin/RevokeAdminAccess?email=' + this.user.email, null);
  }

}

export class Socialusers {
  provider: string;
  id: string;
  email: string;
  name: string;
  image: string;
  token?: string;
  idToken?: string;
}
