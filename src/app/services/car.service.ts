import { SingleResponseModel } from './../models/response/singleResponseModel';
import { CarListModel } from './../models/carListModel';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from './../models/response/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandListModel } from '../models/brandListModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl :string = environment.apiUrl + "cars/";
  constructor(private httpClient : HttpClient) { }

  getCars() :Observable<ListResponseModel<CarListModel>> {
    return this.httpClient.get<ListResponseModel<CarListModel>>(this.apiUrl+"getrentablecars")
  }

  getCarById(id : number) {
    return this.httpClient.get<SingleResponseModel<CarListModel>>(this.apiUrl+"get/"+id)
  }
}
