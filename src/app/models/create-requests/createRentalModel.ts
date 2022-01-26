import { AdditionalServiceListModel } from './../listModels/additionalServiceListModel';

export class CreateRentalModel{
    rentDate : Date;
    returnDate : Date;
    rentedKilometer : number;
    rentedCityId : number;
    returnedCityId : number;
    customerId : number;
    carId : number;
    additionalServices:number[];

    constructor(){
        this.rentDate = new Date();
        this.returnDate = new Date();
        this.rentedKilometer = 0;
        this.rentedCityId = 0;
        this.returnedCityId = 0;
        this.customerId = null;
        this.carId = null;
        this.additionalServices = [];
    }
}