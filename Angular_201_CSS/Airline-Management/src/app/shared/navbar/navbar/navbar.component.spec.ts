import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authenticator;
  let router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        CommonModule,
        SocialLoginModule, RouterTestingModule
      ],
      providers: [
        {
          provide: AuthServiceConfig
        },
        HttpClient, HttpHandler
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([AuthenticatorService], (auth) => {
    authenticator = auth
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should manage responsiveness', () => {
    fixture.detectChanges()
    component.menu();
  })
});
