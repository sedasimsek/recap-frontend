import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/cars/car/car.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { ColorComponent } from './components/colors/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomerComponent } from './components/customer/customer.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CustomerComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    CarAddComponent,
    CarUpdateComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    VatAddedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    //{provide:HTTP_INTERCEPTORS,import { FormsModule, ReactiveFormsModule } from '@angular/forms'; multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
