import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44304/api/";
  constructor(private httpClient:HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getcustomerdetail';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath =this.apiUrl+'customers/getcustomerdetailbyuserid?userid='+userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  // add(customer:Customer):Observable<ResponseModel>{
  //   let newPath = this.apiUrl + "customers/add";
  //   return this.httpClient.post<ResponseModel>(newPath,customer)
  // }

  // update(customer:Customer):Observable<ResponseModel>{
  //   let newPath = this.apiUrl + "customers/update";
  //   return this.httpClient.post<ResponseModel>(newPath,customer)
  // }

  // delete(customer:Customer):Observable<ResponseModel>{
  //   let newPath = this.apiUrl + "customers/delete";
  //   return this.httpClient.post<ResponseModel>(newPath,customer)
  }

