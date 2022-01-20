import { BrandService } from './../../../services/brand.service';
import { ColorService } from './../../../services/color.service';
import { CarService } from './../../../services/car.service';
import { CreateCarModel } from './../../../models/create-requests/createCarModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  addCarForm: FormGroup;
  model: CreateCarModel = new CreateCarModel(); 

  constructor(
    private formBuilder: FormBuilder,
    private carService : CarService,
    private colorService : ColorService,
    private brandService : BrandService
  ) { }

  ngOnInit(): void {
    this.createAddCarForm();
  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      subject: ['', [Validators.maxLength(50)]],
      mailAddress: ['', [Validators.required, Validators.email]],
      nameSurname: ['', [Validators.maxLength(30)]],
      messageText: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  addCar(){
    
  }

}
