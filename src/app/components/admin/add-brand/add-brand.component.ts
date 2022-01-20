import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateBrandModel } from 'src/app/models/create-requests/createBrandModel';
declare let alertify : any;

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  addBrandForm: FormGroup;
  model: CreateBrandModel;
  
  constructor(
    private formBuilder: FormBuilder,
    private brandService : BrandService
  ) { }

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm(){
    this.addBrandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  addBrand(){
    if (this.addBrandForm.valid) {
      this.model = Object.assign({}, this.addBrandForm.value)

      this.brandService.addBrand(this.model).subscribe(
        (data) => {
          alertify.success(data.message);
        },
        (err) => {
          alertify.error('marka eklenemedi ' + err.error.message);
        }
      );
    }
  }

}
