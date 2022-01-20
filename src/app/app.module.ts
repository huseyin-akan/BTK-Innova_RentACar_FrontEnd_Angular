import { RatingModule } from 'primeng/rating';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { NavComponent } from './components/nav/nav.component';
import { RentcarComponent } from './components/rentcar/rentcar.component';
import { HomeComponent } from './components/home/home.component';
import {CalendarModule} from 'primeng/calendar';
import { AddCarComponent } from './components/admin/add-car/add-car.component';
import { AddColorComponent } from './components/admin/add-color/add-color.component';
import { AddBrandComponent } from './components/admin/add-brand/add-brand.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CardetailComponent,
    NavComponent,
    RentcarComponent,
    HomeComponent,
    AddCarComponent,
    AddColorComponent,
    AddBrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    DialogModule,
    RippleModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
