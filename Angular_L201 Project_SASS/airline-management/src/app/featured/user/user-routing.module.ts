import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/check-in/check-in.component';
import { HomeComponent } from './home/home.component';
import { ViewPassengerComponent } from './components/view-passenger/view-passenger.component';
import { ManagePassengerComponent } from './components/manage-passenger/manage-passenger.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'check-in', component: CheckInComponent
      },
      {
        path: 'view-passenger', component: ViewPassengerComponent
      },
      {
        path: 'manage-passenger', component: ManagePassengerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
