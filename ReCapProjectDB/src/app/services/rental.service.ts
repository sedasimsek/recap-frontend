import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44304/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+'rentals/getrentaldetail';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentalByCarId(carId:number) : Observable<SingleResponseModel<RentalDetail>>{
    let newPath = this.apiUrl+"rentals/getrentaldetailbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<RentalDetail>>(newPath);
  }

  getRentalByUserId(userId:number) : Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl+"rentals/getrentaldetailbyuserid?userid="+userId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
}
