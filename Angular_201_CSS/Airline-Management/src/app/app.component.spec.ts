import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticatorService } from './core/authenticator/authenticator.service';
import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        RouterModule,
        SocialLoginModule
      ],
      declarations: [
        AppComponent, NavbarComponent
      ],
      providers: [
        {
          provide:AuthServiceConfig
        },
        HttpClient, HttpHandler
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check access', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService)
    const fixture = TestBed.createComponent(AppComponent);
    service.isLoggedIn = true;
    fixture.componentInstance.checkAccess();
    expect().nothing()
  })

  it('should check access', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService)
    const fixture = TestBed.createComponent(AppComponent);
    service.isLoggedIn = false;
    fixture.componentInstance.checkAccess();
    expect().nothing()
  })

  it('should check access for admin', () => {
    const service: AuthenticatorService = TestBed.get(AuthenticatorService)
    const fixture = TestBed.createComponent(AppComponent);
    service.isLoggedIn = true;
    service.userRole = 'admin'
    fixture.componentInstance.checkAccess();
    expect().nothing()
  })
});
