import { HomeComponent } from './components/home/home.component';
import { RentcarComponent } from './components/rentcar/rentcar.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';

const routes: Routes = [
  {path: "cardetails/:id", component : CardetailComponent},
  {path: "rentcar/:id", component : RentcarComponent},
  {path: "allrentablecars", component : CarComponent},
  {path: "home", component : HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
