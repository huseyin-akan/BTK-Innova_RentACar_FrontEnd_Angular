import { ColorListModel } from './../models/colorListModel';
import { ListResponseModel } from './../models/response/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl :string = environment.apiUrl + "colors/";
  constructor(private httpClient: HttpClient) { }

  getColors() :Observable<ListResponseModel<ColorListModel>> {
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl+"getall")
  }
}
