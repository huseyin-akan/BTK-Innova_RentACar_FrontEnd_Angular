import { ResponseModel } from './../models/response/responseModel';
import { ColorListModel } from './../models/colorListModel';
import { ListResponseModel } from './../models/response/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateColorModel } from '../models/create-requests/createColorModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl :string = environment.apiUrl + "colors/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getColors() :Observable<ListResponseModel<ColorListModel>> {
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl+"getall")
  }

  addColor( model : CreateColorModel){
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      model,
      this.httpOptions
    );
  }
}
