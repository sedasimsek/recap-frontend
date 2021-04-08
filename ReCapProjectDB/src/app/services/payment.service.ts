import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/carttItems';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl="https://localhost:44304/api/";
  constructor(private httpClient : HttpClient) { }

  addPayment(payment:Payment) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/add"
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

  addToCart(rental:Rental){
    let cartItem = new CartItem();
    cartItem.rental = rental;
    CartItems.push(cartItem);
  }

  listCart(): CartItem[]{
    return CartItems;
  }
}
