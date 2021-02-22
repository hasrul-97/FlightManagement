import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: './featured/home-page/home-page.module#HomePageModule'
  },
  {
    path: 'admin', loadChildren: './featured/admin/admin.module#AdminModule'
  },
  {
    path: 'user', loadChildren: './featured/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
