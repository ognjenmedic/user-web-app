import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { Product, ProductCategory } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Subject<Product[]>;
  public selectedCategory$: ReplaySubject<ProductCategory>;
  constructor(private http: HttpClient) {
    this.selectedCategory$ = new ReplaySubject();
    this.products = new Subject();
  }

  getProducts(): Observable<Product[]> {
    const params = new HttpParams().set('_page', '0').set('_limit', '30');
    return this.http.get<Product[]>('/PRODUCTS', { params });
  }

  getProduct(productIdFromRoute: number): Observable<Product> {
    const productUrl = `/PRODUCTS?sku=${productIdFromRoute} `;
    return this.http.get<Product>(productUrl).pipe(map((res: any) => res[0]));
  }

  getProductByCategoryId(categoryIdFromRoute: number): Observable<Product> {
    const categoryUrl = `/PRODUCTS?categoryId=${categoryIdFromRoute} `;
    return this.http.get<Product>(categoryUrl);
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/PRODUCTS?q=${query}`
    );
  }
}
