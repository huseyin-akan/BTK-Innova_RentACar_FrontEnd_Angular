import { SingleResponseModel } from './../models/response/singleResponseModel';
import { CreateRentalModel } from 'src/app/models/create-requests/createRentalModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RentalModel } from '../models/rentalModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl :string = environment.apiUrl + "rentals/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  addRental(createRentalModel : CreateRentalModel){
    return this.httpClient.post<SingleResponseModel<RentalModel>>(
      this.apiUrl + 'rentforindividual',
      createRentalModel,
      this.httpOptions
    );
  }
}
