import { CarService } from './../../services/car.service';
import { CarListModel } from './../../models/carListModel';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  car :CarListModel;
  id : number;
  constructor(
    private carService : CarService, 
    private activatedRoute : ActivatedRoute    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => { 
        this.id = Number(params.get('id'));
        this.getCar(this.id);
      })
  }

  getCar(id:number){
    this.carService.getCarById(id).subscribe(
      response => {
        this.car = response.data;     
      },
      error =>{
        
      },
      () =>{
        
      }
    )
  }

}
