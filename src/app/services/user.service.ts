import { CreateIndCustomerModel } from 'src/app/models/create-requests/createIndCustomerModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserListModel } from '../models/listModels/userListModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl :string = environment.apiUrl + "individualcustomer/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUserByEmail(email : String) :Observable<SingleResponseModel<UserListModel>> {
    return this.httpClient.get<SingleResponseModel<UserListModel>>(this.apiUrl+"getbyemail/?email=" + email)
  }

  addUser(model : CreateIndCustomerModel){
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      model,
      this.httpOptions
    );
  }
}
