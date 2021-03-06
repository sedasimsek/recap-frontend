import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/cars/car/car.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { ColorComponent } from './components/colors/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomerComponent } from './components/customer/customer.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { AccountComponent } from './components/account/account.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CarFilterComponent } from './components/cars/car-filter/car-filter.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CarRentComponent } from './components/cars/car-rent/car-rent.component';
import { DescriptionPipe } from './pipes/description.pipe';
import { FindexComponent } from './components/findex/findex.component';
import { RentedComponent } from './components/rentals/rented/rented.component';
import { RegisterComponent} from './components/register/register.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CustomerComponent,
    BrandAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    RegisterComponent,
    VatAddedPipe,
    FooterComponent,
    LoginComponent,
    AccountComponent,
    CarFilterComponent,
    CarRentComponent,
    DescriptionPipe,
    FindexComponent,
    RentedComponent,
    ColorAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FontAwesomeModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class AppModule { }
