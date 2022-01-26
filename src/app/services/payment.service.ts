import { SingleResponseModel } from './../models/response/singleResponseModel';
import { CreatePaymentModel } from './../models/create-requests/createPaymentModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response/responseModel';
import { InvoiceListModel } from '../models/listModels/invoiceListModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl :string = environment.apiUrl + "payments/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  makePayment(createPaymentModel : CreatePaymentModel){
    return this.httpClient.post<SingleResponseModel<InvoiceListModel>>(
      this.apiUrl + 'pay',
      createPaymentModel,
      this.httpOptions
    );
  }
}
