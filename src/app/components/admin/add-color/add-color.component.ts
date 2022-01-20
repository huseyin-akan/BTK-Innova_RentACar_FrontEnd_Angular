import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateColorModel } from 'src/app/models/create-requests/createColorModel';
import { ColorService } from 'src/app/services/color.service';
declare let alertify:any;

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  addColorForm: FormGroup;
  model: CreateColorModel = new CreateColorModel();
  
  constructor(
    private formBuilder: FormBuilder,
    private colorService : ColorService
  ) { }

  ngOnInit(): void {
    this.createColorForm();
  }

  createColorForm(){
    this.addColorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  addColor(){
    if (this.addColorForm.valid) {
      this.model = Object.assign({}, this.addColorForm.value)

      this.colorService.addColor(this.model).subscribe(
        (data) => {
          alertify.success(data.message);
        },
        (err) => {
          alertify.error('renk eklenemedi ' + err.error);
        }
      );
    }
  }

}
