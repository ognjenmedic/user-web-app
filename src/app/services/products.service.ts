import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { Product, ProductCategory } from 'src/app/common/product';

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
  // get product based on product id from route
  getProduct(productIdFromRoute: number): Observable<Product> {
    // const productUrl = `/PRODUCTS/{{productIdFromRoute}} `;
    const productUrl = `/PRODUCTS?sku=${productIdFromRoute} `;

    return this.http.get<Product>(productUrl).pipe(map((res: any) => res[0])); // is alternative to this maybe this: this.router.navigateByUrl(`/products?sku=${product.sku}`); ?
  }

  getProductByCategoryId(categoryIdFromRoute: number): Observable<Product> {
    // const productUrl = `/PRODUCTS/{{productIdFromRoute}} `;
    const productUrl = `/PRODUCTS?categoryId=${categoryIdFromRoute} `; // should this be categoryUrl instead of productUrl?

    return this.http.get<Product>(productUrl);
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/PRODUCTS?q=${query}`
    );
  }
}
