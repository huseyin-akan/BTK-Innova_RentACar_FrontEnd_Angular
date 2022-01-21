import { CreateCreditCardInfoModel } from './createCreditCardInfoModel';
export class CreatePaymentModel{
    paymentDate: Date;
    saveRequested : boolean;
    rentalId : number;
    code : string;
    createCreditCardInfoRequest : CreateCreditCardInfoModel;

    constructor(){
        this.paymentDate = new Date();
        this.saveRequested = false;
        this.rentalId = 0;
        this.code = "";
        this.createCreditCardInfoRequest = new CreateCreditCardInfoModel();
    }
}