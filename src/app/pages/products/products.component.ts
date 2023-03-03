import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product, ProductCategory } from 'src/app/common/product';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // categoryId: number; // added new 19 feb
  // product: undefined; // added new 19 feb
  productsSub: any;
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: ProductCategory;
  ProductCategoryEnum: typeof ProductCategory;
  // selectedCategory!: string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.products = [];
    this.filteredProducts = [];
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit() {
    firstValueFrom(this.productService.getProducts()).then(
      (value: Product[]) => {
        this.products = value;
        this.filteredProducts = value;
      }
    );

    // this.productService.selectedCategory$.subscribe(
    //   (productCategory: ProductCategory) => {
    //     this.filteredProducts = this.products.filter(
    //       (value: Product) => value.categoryId === productCategory
    //     );
    //   }
    // );
    this.route.queryParams.subscribe((params: any) => {
      const categoryId = params.categoryId;
      if (categoryId != this.ProductCategoryEnum.ALL) {
        this.productService
          .getProductByCategoryId(categoryId)
          .subscribe((products: any) => {
            this.filteredProducts = products;
          });
      } else {
        this.filteredProducts = this.products;
      }
    });
  }
  // // First get the category id from the current route. // added new 19 feb
  // this.productService.selectedCategory$.subscribe((event: any) => {
  // const routeParams = this.route.snapshot.paramMap.get('categoryId');
  // const categoryIdFromRoute = Number(routeParams.get('categoryId'));
  // console.log(routeParams);
  //   this.productService
  //     .getProductByCategory()
  //     .subscribe((data: any) => (this.filteredProducts = data));
  // });

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
