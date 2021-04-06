import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/credit-card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/add",card);
  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"creditcards/getbycustomer?id="+customerId);
  }
  
  update(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/update",card);
  }
  
  delete(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/delete",card);
  }

}
