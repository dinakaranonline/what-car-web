import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {CarsComponent} from './cars/cars.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import { LoginComponent } from './security/login.component';


const routes: Routes = [
  { path:'',redirectTo:'cars',pathMatch:'full'},
  { path: 'cars', component: CarsComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'detail/:id', component: CarDetailComponent },
  { path:'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
