import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PRODUCTS } from 'src/db-data';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  // products!: Product[];

  num: number = 1;

  cal = (id: string) => {
    if (id === 'sub' && this.num > 1) {
      this.num--;
    }
    if (id === 'add' && this.num < 10) {
      this.num++;
    }
  };

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productSku'));

    // Find the product that corresponds with the id provided in route.
    // this.product = PRODUCTS.find(
    //   (product) => product.sku === productIdFromRoute
    // );
    this.productsService
      .getProduct(productIdFromRoute)
      .subscribe((data) => (this.product = data));
  }
}
