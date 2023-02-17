import { Component, Input, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/db-data';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;
  constructor() {}

  ngOnInit(): void {}
}