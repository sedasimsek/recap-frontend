import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserModel } from '../models/userModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firstName: string = "";
  lastName:string="";
  role:any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId!: number;
  email!: string;
  apiUrl = 'https://localhost:44304/api/auth';

  constructor(private httpClient: HttpClient,
    private localStorageService:LocalStorageService,
    private router: Router,
    private jwtHelper: JwtHelperService) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<RegisterModel>> {
    let newPath = this.apiUrl + '/register';
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(
      newPath,
      registerModel
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  update(userModel: UserModel): Observable<SingleResponseModel<UserModel>> {
    let newPath = this.apiUrl + '/update';
    return this.httpClient.post<SingleResponseModel<UserModel>>(
      newPath,
      userModel
    );
  }

  userDetailFromToken(){
    this.token = this.localStorageService.getItem("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.firstName = firstName.split(' ')[0];
    let lastName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.lastName = lastName.split(' ')[1];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId =parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.email=decodedToken["email"];
  }

  roleCheck(roleList: string[]) {
    if (this.roles !== null) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }

  logout(){
    localStorage.clear();
    this.onRefresh();
    this.router.navigateByUrl('/');
    
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
