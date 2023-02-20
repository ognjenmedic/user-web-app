import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { Product, ProductCategory } from 'src/app/common/product';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { PRODUCTS } from 'src/db-data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // categoryId: number; // added new 19 feb
  // product: undefined; // added new 19 feb
  products$!: Observable<Product[]>;
  products: Product[];
  filteredProducts: Product[];
  // selectedCategory!: string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.products = [];
    this.filteredProducts = [];
  }

  ngOnInit() {
    firstValueFrom(this.productService.getProducts()).then(
      (value: Product[]) => {
        this.products = value;
        this.filteredProducts = value;
      }
    );

    this.productService.selectedCategory$.subscribe(
      (productCategory: ProductCategory) => {
        this.filteredProducts = this.products.filter(
          (value: Product) => value.categoryId === productCategory
        );
      }
    );

    // // First get the category id from the current route. // added new 19 feb
    // const routeParams = this.route.snapshot.paramMap;
    // const categoryIdFromRoute = Number(routeParams.get('categoryId'));

    // // Find the product that correspond with the id provided in route // added new 19 feb
    // this.product = PRODUCTS.find(
    //   (product) => product.categoryId === categoryIdFromRoute
    // );
  }

  // new code - function to subscribe and list all products
  // listProducts() {
  //   this.productService.getProducts().subscribe((data) => {
  //     this.products = data;
  //   });
  // }
}
