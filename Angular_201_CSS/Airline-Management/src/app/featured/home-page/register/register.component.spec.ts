import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from '../home-page-routing.module';
import { HomeComponent } from '../home/home.component';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { UserService } from '../../user/service/user.service';
import { GoogleLoginProvider, SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export function provideConfig() {
  return config;
}
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("596815253582-7fkq5r21c6ne3ne0buel6tbas303t0mu.apps.googleusercontent.com",googleLoginOptions)
  }
]);

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let RegisterForm: FormGroup;
  let authenticator;
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, HomeComponent],
      imports: [
        CommonModule,
        HomePageRoutingModule,
        FormsModule, ReactiveFormsModule,
        SocialLoginModule, RouterTestingModule
      ],
      providers: [{
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
        HttpClient, HttpHandler
      ]

    })
      .compileComponents();
  }));

  beforeEach(inject([AuthenticatorService, UserService], (auth, user) => {
    authenticator = auth
    userService = user
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialze form', () => {
    component.initializeForm()
    expect().nothing()
  })

  it('should login', () => {
    component.initializeForm()
    component.RegisterForm.controls['email'].setValue('something')
    component.RegisterForm.markAllAsTouched();
    component.RegisterForm.markAsPristine();
    let data = {
      statusCode: 200,
      dataList: []
    }
    spyOn(userService, 'register').and.returnValue(of(data))
    spyOn(authenticator, 'checkIfUserIsRegistered').and.returnValue(of(null))
    component.login()
    expect().nothing()
  })
});
