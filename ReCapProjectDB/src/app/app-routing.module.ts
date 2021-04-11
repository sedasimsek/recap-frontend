import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarComponent } from './components/cars/car/car.component';
import { FindexComponent } from './components/findex/findex.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { CarRentComponent } from './components/cars/car-rent/car-rent.component';
import { RentedComponent } from './components/rentals/rented/rented.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brands/:brandId", component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/rentacar/:id",component:CarRentComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/add", component:BrandAddComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[AdminGuard]},
  {path:"cars/update/:id", component:CarUpdateComponent,canActivate:[AdminGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"account",component:AccountComponent},
  {path:"payment", component:PaymentComponent},
  {path:"findex", component:FindexComponent},
  {path:"rented", component:RentedComponent},
  {path:"footer", component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
