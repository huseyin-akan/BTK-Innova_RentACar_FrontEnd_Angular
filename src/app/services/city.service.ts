import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityListModel } from '../models/listModels/cityListModel';
import { ListResponseModel } from '../models/response/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl :string = environment.apiUrl + "cities/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getCities() :Observable<ListResponseModel<CityListModel>> {
    return this.httpClient.get<ListResponseModel<CityListModel>>(this.apiUrl+"getall")
  }
}
