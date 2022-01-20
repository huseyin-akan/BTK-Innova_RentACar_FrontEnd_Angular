import { CreateBrandModel } from './../models/create-requests/createBrandModel';
import { ListResponseModel } from './../models/response/listResponseModel';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandListModel } from '../models/brandListModel';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from '../models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl :string = environment.apiUrl + "brands/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBrands() :Observable<ListResponseModel<BrandListModel>> {
    return this.httpClient.get<ListResponseModel<BrandListModel>>(this.apiUrl+"getall")
  }

  addBrand( model : CreateBrandModel){
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      model,
      this.httpOptions
    );
  }
}
