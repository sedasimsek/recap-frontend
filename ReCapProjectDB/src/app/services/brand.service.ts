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

  apiUrl="https://localhost:44304/api/brands";
  
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+'/getall';
    return this.httpClient
    .get<ListResponseModel<Brand>>(newPath);
  }


  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+"/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

}
