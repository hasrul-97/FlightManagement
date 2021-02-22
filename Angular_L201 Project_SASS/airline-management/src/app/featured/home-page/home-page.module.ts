import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, RegisterComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class HomePageModule { }
