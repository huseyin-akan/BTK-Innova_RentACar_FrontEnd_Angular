import { AdditionalServiceListModel } from './additionalServiceListModel';
export interface InvoiceListModel{
    firstName : string;
    lastName : string;
    email : string;
    rentDate : Date;
    returnDate : Date;
    rentedKilometer : number;
    dailyPrice : number;
    modelYear : number;
    brandName : string;
    modelName : string;
    imageUrl : string;
    color : string;
    rentCity : string;
    returnCity : string;
    paymentDate : Date;
    totalSum : number;
    invoiceDate : Date;
    addtionalServices : AdditionalServiceListModel[];	
}