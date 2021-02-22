import { TestBed } from '@angular/core/testing';

import { AuthenticatorService, Socialusers } from './authenticator.service';
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig, AuthService, LoginOpt, } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { of, never } from 'rxjs';
import { Component } from '@angular/core';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('596815253582-7fkq5r21c6ne3ne0buel6tbas303t0mu.apps.googleusercontent.com', googleLoginOptions)
  }
]);
export function provideConfig() {
  return config;
}



describe('AuthenticatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SocialLoginModule, RouterTestingModule
    ],
    providers: [
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
      HttpClient, HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService);
    expect(service).toBeTruthy();
  });

  it('should', () => {
    const service: AuthService = TestBed.get(AuthService);
    const data = {
      user: []
    };
    spyOn(service, 'signIn').and.callFake;
  });

  it('should check for user', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService);
    let datareturn: {
      statusCode: 200,
      dataList: [{
        name: 'something'
      }, {
        name: 'something else'
      }]

    }

    spyOn(service.http, 'get').and.returnValue(of(datareturn));
    service.checkIfUserIsRegistered('something')
  })

  it('should check for user', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService);
    let datareturn: any = {
      statusCode: 200,
      dataList: [{
        name: 'something'
      }, {
        name: 'something else'
      }]
    }
    spyOn(service.http, 'get').and.returnValue(of(datareturn));
    const component: AuthenticatorService = TestBed.get(AuthenticatorService)
    component.data = [];
    service.checkIfUserIsRegistered('something');
    expect().nothing;
  });

  it('should sign in', () => {
    const service: AuthService = TestBed.get(AuthService);
    const auth: AuthenticatorService = TestBed.get(AuthenticatorService);

    spyOn(service, 'signIn').and.callFake
    auth.user = null;
    auth.GoogleLogin();
    expect().nothing
  })

  it('should sign out', () => {
    const service: AuthService = TestBed.get(AuthService);
    const auth: AuthenticatorService = TestBed.get(AuthenticatorService);

    spyOn(auth.authService, 'signOut').and.callFake;
    auth.signOut();
    expect().nothing;
  })

});
