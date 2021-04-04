import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiUrl+'brands/getall';
    return this.httpClient
    .get<ListResponseModel<Brand>>(newUrl);
  }

  getBrandById(brandId: number): Observable<ItemResponseModel<Brand>> {
    let newUrl = this.apiUrl+'brands/getbyid?id='+brandId;
    return this.httpClient.get<ItemResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiUrl+"brands/add";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"brands/update";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"brands/delete";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }
}
