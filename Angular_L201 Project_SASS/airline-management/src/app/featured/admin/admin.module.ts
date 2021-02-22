import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AddPassengerComponent } from './components/add-passenger/add-passenger.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { ManageFlightComponent } from './components/manage-flight/manage-flight.component';
import { ManagePassengerComponent } from './components/manage-passenger/manage-passenger.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { EditPassengerComponent } from './components/edit-passenger/edit-passenger.component';
import { EditFlightComponent } from './components/edit-flight/edit-flight.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [HomeComponent, AddPassengerComponent, AddFlightComponent, ManageFlightComponent, ManagePassengerComponent, EditPassengerComponent, EditFlightComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule
  ]
})
export class AdminModule { }
