import { CarClassesService } from './../../../services/car-classes.service';
import { CarClassesListModel } from './../../../models/listModels/carClassesListModel';
import { ColorListModel } from './../../../models/colorListModel';
import { BrandService } from './../../../services/brand.service';
import { ColorService } from './../../../services/color.service';
import { CarService } from './../../../services/car.service';
import { CreateCarModel } from './../../../models/create-requests/createCarModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandListModel } from 'src/app/models/brandListModel';
declare let alertify:any;

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  addCarForm: FormGroup;
  model: CreateCarModel = new CreateCarModel(); 
  brands : BrandListModel[] = [];
  colors : ColorListModel[] = [];
  carClasses : CarClassesListModel[] = [];

  dataLoaded : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService : CarService,
    private colorService : ColorService,
    private brandService : BrandService,
    private carClassService : CarClassesService
  ) { }

  ngOnInit(): void { 
    this.getColors();
    this.createAddCarForm();
  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      dailyPrice: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      description: ['', [Validators.required]],
      kilometer: ['', [Validators.required]],
      minAge: ['', [Validators.required]],
      findexScore: ['', [Validators.required]],
      brandId : [' '],
      colorId : [' '],
      carClassId : [' '],

    });
  }

  addCar(){
      this.model = Object.assign({}, this.addCarForm.value)

      // this.model.brandId = parseInt(this.model.brandId.toString() )
      // this.model.colorId = parseInt(this.model.colorId.toString() )
      // this.model.carClassId = parseInt(this.model.carClassId.toString() )
    console.log(this.model)
      this.carService.addCar(this.model).subscribe(
        (data) => {
          alertify.success(data.message);
        },
        (err) => {
          alertify.error('araba ekleme işlemi başarısız oldu' + err.error.message);
        }
      );
  }

  getColors(){
    this.colorService.getColors().subscribe(
      response => {
        this.colors = response.data;
        this.getBrands();
        
      }
    );
  }

  getBrands(){
    this.brandService.getBrands().subscribe(
      response => {
        this.brands = response.data;
        this.getCarClasses();
        
      }
    )
  }

  getCarClasses(){
    this.carClassService.getCarClasses().subscribe(
      response => {
        this.carClasses = response.data;
        this.dataLoaded = true;
      }
    )
  }

}
