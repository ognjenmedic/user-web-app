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
  products$!: Observable<Product[]>;
  products: Product[];
  filteredProducts: Product[];
  // selectedCategory!: string;

  constructor(private productService: ProductsService) {
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
  }

  // new code - function to subscribe and list all products
  listProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
