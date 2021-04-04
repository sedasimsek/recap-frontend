import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +'cars/getcarsdetail';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }
  
  update(car:Car):Observable<ResponseModel> {
    console.log(car);
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car);
  }

  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }

  getCarsByBrand(brandId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrand?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolor?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilters(brandId:Number,colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandandcolor?brandId="+brandId+"&colorId"+colorId ;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetail(carId:number):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcardetailbyid?id='+carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath)
  }
}
