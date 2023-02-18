import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product, ProductCategory } from 'src/app/common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public selectedCategory$: Subject<ProductCategory>;
  constructor(private http: HttpClient) {
    this.selectedCategory$ = new Subject();
  }

  getProducts(): Observable<Product[]> {
    const params = new HttpParams().set('page', '0').set('pageSize', '6');
    return this.http.get<Product[]>('/PRODUCTS', { params });
  }
}
