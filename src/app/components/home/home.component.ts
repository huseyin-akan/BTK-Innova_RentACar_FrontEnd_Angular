import { CarService } from './../../services/car.service';
import { CarListModel } from './../../models/carListModel';
import { Component, OnInit } from '@angular/core';
declare let alertify : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars : CarListModel[];

  constructor(
    private carService : CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(
      (response) =>{
        this.cars = response.data;
      },
      (err) =>{
        alertify.error(err.error);
      }
    );
  }

}
