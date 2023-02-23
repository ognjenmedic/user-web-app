import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
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
    const params = new HttpParams().set('_page', '0').set('_limit', '30');
    return this.http.get<Product[]>('/PRODUCTS', { params });
  }
  // get product based on product id from route
  getProduct(productIdFromRoute: number): Observable<Product> {
    // const productUrl = `/PRODUCTS/{{productIdFromRoute}} `;
    const productUrl = `/PRODUCTS?sku=${productIdFromRoute} `;

    return this.http.get<Product>(productUrl).pipe(map((res: any) => res[0]));
  }

  getProductByCategory(categoryIdFromRoute: number): Observable<Product> {
    // const productUrl = `/PRODUCTS/{{productIdFromRoute}} `;
    const url = `/PRODUCTS?categoryId=${categoryIdFromRoute} `;

    return this.http.get<Product>(url);
  }
}
