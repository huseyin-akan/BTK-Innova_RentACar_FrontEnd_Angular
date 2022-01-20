import { CreateCarModel } from './../models/create-requests/createCarModel';
import { SingleResponseModel } from './../models/response/singleResponseModel';
import { CarListModel } from './../models/carListModel';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from './../models/response/listResponseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl :string = environment.apiUrl + "cars/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  getCars() :Observable<ListResponseModel<CarListModel>> {
    return this.httpClient.get<ListResponseModel<CarListModel>>(this.apiUrl+"getrentablecars")
  }

  getCarById(id : number) {
    return this.httpClient.get<SingleResponseModel<CarListModel>>(this.apiUrl+"get/"+id)
  }

  addCar(createCarModel : CreateCarModel){
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      createCarModel,
      this.httpOptions
    );
  }
}
