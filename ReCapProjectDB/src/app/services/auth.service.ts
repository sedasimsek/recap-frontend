import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name: string = "";
  surname:string="";
  role:any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId!: number;
  email!: string;
  apiUrl = 'https://localhost:44304/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel): Observable<SingleResponseModel<RegisterModel>> {
    let newPath=this.apiUrl+"/register";
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(newPath,registerModel)
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } 
    else {
      return false;
    }
  }

  
}
