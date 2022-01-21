export class CreateRentalModel{
    rentDate : Date;
    returnDate : Date;
    rentedKilometer : number;
    rentedCity : String;
    returnedCity : String;
    customerId : number;
    carId : number;

    constructor(){
        this.rentDate = new Date();
        this.returnDate = new Date();
        this.rentedKilometer = 0;
        this.rentedCity = "";
        this.returnedCity = "";
        this.customerId = null;
        this.carId = null;
    }
}