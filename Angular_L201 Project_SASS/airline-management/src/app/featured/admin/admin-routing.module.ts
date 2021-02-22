import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPassengerComponent } from './components/add-passenger/add-passenger.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { ManageFlightComponent } from './components/manage-flight/manage-flight.component';
import { ManagePassengerComponent } from './components/manage-passenger/manage-passenger.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'add-passenger', component: AddPassengerComponent,
      },
      {
        path: 'add-flight', component: AddFlightComponent
      },
      {
        path: 'manage-flight', component: ManageFlightComponent,
      },
      {
        path: 'manage-passenger', component: ManagePassengerComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
