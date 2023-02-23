import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public ProductCategoryEnum: typeof ProductCategory;

  constructor(private productService: ProductsService) {
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit(): void {}
  selectCategory(productCategory: ProductCategory): void {
    this.productService.selectedCategory$.next(productCategory);
  }
}
