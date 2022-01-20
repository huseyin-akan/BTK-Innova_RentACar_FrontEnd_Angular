import { CarClassesListModel } from './../models/listModels/carClassesListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/response/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarClassesService {

  apiUrl :string = environment.apiUrl + "carclasses/";
  constructor(private httpClient : HttpClient) { }

  getCarClasses() :Observable<ListResponseModel<CarClassesListModel>> {
    return this.httpClient.get<ListResponseModel<CarClassesListModel>>(this.apiUrl+"getall")
  }

}
