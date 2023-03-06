import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, throttle, throttleTime } from 'rxjs';
import { Product, ProductCategory } from '../common/product';
import { ProductsService } from '../shared/services/products-service/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // product: undefined; // added new 19 feb
  // categoryId: number; // added new 19 feb
  products!: Product[]; // new code
  public ProductCategoryEnum: typeof ProductCategory;
  mobileMenu: boolean = true;
  mobileMenuBtn() {
    this.mobileMenu = !this.mobileMenu;
  }

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit(): void {}

  selectCategory(productCategory: ProductCategory): void {
    this.router.navigateByUrl(`/products?categoryId=${productCategory}`);
  }
  // // new code
  // allProducts(): void {
  //   this.productService.getProducts().subscribe((products) => {
  //     this.products = products;
  //   });
  // }
  // // new code - function to subscribe and list all products
  // listProducts() {
  //   this.productService.getProducts().subscribe((data) => {
  //     this.products = data;
  //   });
  // }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.productService
        .searchProducts(element.value)
        .pipe(throttleTime(3000))
        .subscribe((result) => {
          console.warn(result);
          this.productService.products.next(result);
        });
    }
  }
}
