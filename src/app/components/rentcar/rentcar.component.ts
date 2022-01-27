import { InvoiceListModel } from './../../models/listModels/invoiceListModel';
import { AdditionalServiceService } from './../../services/additional-service.service';
import { AdditionalServiceListModel } from './../../models/listModels/additionalServiceListModel';
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
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute } from '@angular/router';
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
  invoiceListModel : InvoiceListModel;

  user :UserListModel = new UserListModel();
  customerFound :boolean = false;
  selectedCar = 0;
 

  cities : CityListModel[] = [];
  additionalServices : AdditionalServiceListModel[] = [];
  selectedAdditionalServices : AdditionalServiceListModel[] = [];

  rentDate : Date = new Date();
  returnDate : Date = new Date();
  dayForRental : number =0;
  minDateValue : Date = new Date();

  cars :CarListModel[] = [];
  selectedCarPrice = 0;
  selectedASPrice = 0;
  totalSum : number = 0;
  dataLoaded : boolean = false;
  paymentIsMade: boolean = false;

  sortOptions: SelectItem[];
  sortOptions2: SelectItem[];
  sortOrder: number;
  sortField: string;

  saveCardChecked : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService : RentalService,
    private primengConfig: PrimeNGConfig,
    private carService : CarService,
    private cityService : CityService,
    private userService : UserService,
    private additionalServiceService : AdditionalServiceService,
    private paymentService : PaymentService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.createRentalForm();
    this.creaeteCustomerAddForm();
    this.getCars();
    this.getAdditionalServices();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!dailyPrice'},
      {label: 'Price Low to High', value: 'dailyPrice'}
  ];

  this.sortOptions2 = [
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'}
];

  this.primengConfig.ripple = true;

  this.createPaymentModel.createCreditCardInfoRequest.creditCard = "";
  this.createPaymentModel.createCreditCardInfoRequest.validDate = "";

  $('#mailAdress').blur(
    () =>{
      this.checkForCustomerByMail( $('#mailAdress').val() )
    }
  );
  
  //detaylar sayfasından gelirsek id'miz olmalı öyleyse seçim yapmalıyız.
  this.activatedRoute.paramMap.subscribe(
    params => { 
      this.selectedCar = Number(params.get('id'))
      if(this.selectedCar!= 0){
        this.selectCar(this.selectedCar);
      }      
    })

  }

  getTotalSumOfSelectAS(){
    let result = 0;
    this.selectedAdditionalServices.map( x => result += x.price);
    return result;
  }    

  deneme(){
    console.log(this.additionalServices)
    let asd = this.selectedAdditionalServices.filter(x => x.id == 5).length >0;
  }

  onRentDateSelect(){
    this.rentDate = this.rentalForm.controls['rentDate'].value;
    let dayDiff = (this.returnDate.getTime() - this.rentDate.getTime() )
    if(dayDiff == 0){
      this.dayForRental = 1;
    }else{
      this.dayForRental= Math.ceil( dayDiff / (1000 * 60 * 60 * 24)); 
    }
  }

  onReturnDateSelect(){
    this.returnDate = this.rentalForm.controls['returnDate'].value;
    let dayDiff = (this.returnDate.getTime() - this.rentDate.getTime() )
    if(dayDiff == 0){
      this.dayForRental = 1;
    }else{
      this.dayForRental= Math.ceil( dayDiff / (1000 * 60 * 60 * 24)); 
    }
      
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

  getAdditionalServices(){
    this.additionalServiceService.getAdditionalServices().subscribe(
      response => {
        console.log(response.data)
        this.additionalServices = response.data;
      }
    );
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
      rentedCityId: ['', [Validators.required]],
      returnedCityId: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      rentDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
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

      this.rentalModel.rentedKilometer = this.cars.find(x => x.id == this.selectedCar).kilometer;
      this.rentalModel.customerId = this.user.id;
      this.rentalModel.carId = this.selectedCar;
      this.rentalModel.additionalServices = this.selectedAdditionalServices.map(x => x.id);

      console.log(this.rentalModel)
      this.rentalService.addRental(this.rentalModel).subscribe(
        (response) => {
          alertify.success(response.message);
          console.log(response.data);
          this.createPaymentModel.rentalId = response.data.id;
          this.makePayment();
        },
        (err) => {
          alertify.error('kayıt başarılı olmadı: ' + err.error.message);
        }
      );
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

  makePayment(){

    this.createPaymentModel.saveRequested = this.saveCardChecked;
    this.createPaymentModel.createCreditCardInfoRequest.customerId = this.rentalModel.customerId;

    console.log(this.createPaymentModel);
    this.paymentService.makePayment(this.createPaymentModel).subscribe(
      response => {
        this.invoiceListModel = response.data;
        this.paymentIsMade = true;
        alertify.success(response.message)
      },
      err => {
        alertify.error(err.error.message)
      }
    );
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
    let selectedCarObj = this.cars.find( x => x.id == id);
    $('#ypt_selected_car').text( selectedCarObj.brand + " - " + selectedCarObj.modelName );
    this.selectedCarPrice = selectedCarObj.dailyPrice * this.dayForRental;
    this.totalSum = this.selectedCarPrice + this.selectedASPrice;
  }

  addAS(id:number){
    let selectedItem = this.additionalServices.find(x => x.id == id);
    this.selectedAdditionalServices.push(selectedItem);
    this.selectedASPrice = this.getTotalSumOfSelectAS() * this.dayForRental;
    this.totalSum = this.selectedCarPrice + this.selectedASPrice;
  }

  removeAS(id: number){
    this.selectedAdditionalServices = this.selectedAdditionalServices.filter( x => x.id != id);
    this.selectedASPrice = this.getTotalSumOfSelectAS() * this.dayForRental;
    this.totalSum = this.selectedCarPrice + this.selectedASPrice;
  }

  checkIfItemAdded(id :number){
    return this.selectedAdditionalServices.filter(x=>x.id == id).length >0;
  }

  changeReturnedCity(value:any){
    $('#ypt_returned_city').text( this.cities[value -1].cityName );
  }

  changeRentCity(value:any){
    $('#ypt_rent_city').text( this.cities[value -1].cityName );
  }

}
