import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from '../common/product';
import { ProductsService } from '../shared/services/products-service/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  products!: Product[]; // new code
  public ProductCategoryEnum: typeof ProductCategory;
  mobileMenu: boolean = true;
  mobileMenuBtn() {
    this.mobileMenu = !this.mobileMenu;
  }

  constructor(private productService: ProductsService) {
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit(): void {}

  selectCategory(productCategory: ProductCategory): void {
    this.productService.selectedCategory$.next(productCategory);
  }
  // new code
  allProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  // new code - function to subscribe and list all products
  listProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
