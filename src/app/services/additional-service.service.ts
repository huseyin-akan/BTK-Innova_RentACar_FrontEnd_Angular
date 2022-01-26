import { AdditionalServiceListModel } from './../models/listModels/additionalServiceListModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/response/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {

  apiUrl :string = environment.apiUrl + "additionalservices/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAdditionalServices()  {
    return this.httpClient.get<ListResponseModel<AdditionalServiceListModel>>(this.apiUrl+"getall")
  }
}
