import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getCustomer(): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getcustomerdetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(id:number):Observable<ItemResponseModel<Customer>>{
    let path =this.apiUrl+'customers/getbyid?id='+id;
    return this.httpClient.get<ItemResponseModel<Customer>>(path);
  }

  getCustomerByUserId(id:number):Observable<ListResponseModel<Customer>>{
    let path =this.apiUrl+'customers/getcustomerdetailbyuserid?userid='+id;
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }

  add(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/add";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  delete(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/delete";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }
}
