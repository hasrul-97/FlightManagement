import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CheckInComponent } from './components/check-in/check-in.component';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './home/home.component';
import { DisplayAvailableSeatComponent } from './components/display-available-seat/display-available-seat.component';
import { ViewPassengerComponent } from './components/view-passenger/view-passenger.component';
import { ManagePassengerComponent } from './components/manage-passenger/manage-passenger.component';
import { EditPassengerComponent } from './components/edit-passenger/edit-passenger.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CheckInComponent, HomeComponent, DisplayAvailableSeatComponent, ViewPassengerComponent, ManagePassengerComponent, EditPassengerComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ]
})
export class UserModule { }
