import { UserListModel } from './../../models/listModels/userListModel';
import { CityListModel } from './../../models/listModels/cityListModel';
import { CityService } from './../../services/city.service';
import { CreatePaymentModel } from './../../models/create-requests/createPaymentModel';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { CarListModel } from 'src/app/models/carListModel';
import { CreateIndCustomerModel } from 'src/app/models/create-requests/createIndCustomerModel';
import { CreateRentalModel } from 'src/app/models/create-requests/createRentalModel';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { ThrowStmt } from '@angular/compiler';
declare let alertify:any;
//for Jquery
declare var $:any;

@Component({
  selector: 'app-rentcar',
  templateUrl: './rentcar.component.html',
  styleUrls: ['./rentcar.component.scss']
})
export class RentcarComponent implements OnInit {

  rentalForm: FormGroup;
  customerAddForm : FormGroup;

  rentalModel: CreateRentalModel = new CreateRentalModel(); 
  createCustomerModel : CreateIndCustomerModel;
  createPaymentModel : CreatePaymentModel = new CreatePaymentModel();

  user :UserListModel = new UserListModel();
  customerFound :boolean = false;
  selectedCar = 0;

  cities : CityListModel[] = [];

  rentDate : Date;
  returnDate : Date;

  cars :CarListModel[] = [];
  dataLoaded : boolean = false;

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService : RentalService,
    private primengConfig: PrimeNGConfig,
    private carService : CarService,
    private cityService : CityService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getCars();
    this.createRentalForm();
    this.creaeteCustomerAddForm();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!dailyPrice'},
      {label: 'Price Low to High', value: 'dailyPrice'}
  ];

  this.primengConfig.ripple = true;

  $('#mailAdress').blur(
    () =>{
      this.checkForCustomerByMail( $('#mailAdress').val() )
    }
  );
  }

  getCars(){
    this.carService.getCars().subscribe(
      response => {
        this.dataLoaded = false;
        this.cars = response.data;
        this.dataLoaded = true;
      }
    )
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
  
  createRentalForm(){
    this.rentalForm = this.formBuilder.group({
      rentCity: ['', [Validators.maxLength(50)]],
      mailAddress: ['', [Validators.required, Validators.email]],
      returnedCity: ['', [Validators.maxLength(30)]],
      messageText: ['', [Validators.required, Validators.maxLength(1000)]],
      rentDate: ['', [Validators.required, Validators.maxLength(1000)]],
      returnDate: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  creaeteCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(1000)]],
      password: ['', [Validators.required, Validators.maxLength(1000)]],
      birthDate: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  rentCar() {
    if (this.rentalForm.valid) {
      this.rentalModel = Object.assign({}, this.rentalForm.value)

      // this.rentalService.rentCar(this.model).subscribe(
      //   (data) => {
      //     alertify.info(data.message);
      //   },
      //   (err) => {
      //     alertify.error('kayıt başarılı olmadı  ' + err.error);
      //   }
      // );
    }
  }

  addCustomer( ){
    this.createCustomerModel = Object.assign({}, this.customerAddForm.value)
    
    this.userService.addUser(this.createCustomerModel).subscribe(
      response => {
        alertify.success(response.message)
      },
      err =>{
        alertify.error(err.error.message)
      }
    );
  }

  makePayment(form : NgForm){

  }

  getCities(){
      this.cityService.getCities().subscribe(
        response => {
          this.cities = response.data;          
        }
      );
  }

  checkForCustomerByMail(mail : string){  
    this.userService.getUserByEmail(mail).subscribe(
      response => {
        this.user = response.data;
        this.customerFound = true;
      },
      err => {
        alertify.error(err.error.message)
        this.customerFound = false;
      }
    )
  }

  selectCar(id:number){
    this.selectedCar = id;
    alertify.success(id + "nolu araba seçildi.");
  }

}
