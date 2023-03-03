import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  placeOrder(orderData) {
    return this.http.post<any>('http://localhost:3000/orders', orderData);
  }
}
