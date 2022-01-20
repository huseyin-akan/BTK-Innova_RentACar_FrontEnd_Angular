import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalModel } from 'src/app/models/rentalModel';
import { RentalService } from 'src/app/services/rental.service';
declare let alertify:any;

@Component({
  selector: 'app-rentcar',
  templateUrl: './rentcar.component.html',
  styleUrls: ['./rentcar.component.css']
})
export class RentcarComponent implements OnInit {

  rentalForm: FormGroup;
  model: RentalModel = new RentalModel(); 

  rentDate : Date;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService : RentalService
  ) { }

  ngOnInit(): void {
    alertify.success("Sayfayı alertife ettik. hadi bakalım");
    this.createRentalForm();
  }

  createRentalForm(){
    this.rentalForm = this.formBuilder.group({
      subject: ['', [Validators.maxLength(50)]],
      mailAddress: ['', [Validators.required, Validators.email]],
      nameSurname: ['', [Validators.maxLength(30)]],
      messageText: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  denemeler(){
    this.model = Object.assign({}, this.rentalForm.value)
    console.log(this.rentalForm.get('subject').hasError('maxlength'));
  }

  rentCar() {
    if (this.rentalForm.valid) {
      this.model = Object.assign({}, this.rentalForm.value)

      // this.rentalService.rentCar(this.model).subscribe(
      //   (data) => {
      //     alertify.info(data.message);
      //   },
      //   (err) => {
      //     alertify.error('kayıt başarılı olmadı moruk ' + err.error);
      //   }
      // );
    }
  }

}
