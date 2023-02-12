import { Component, Input } from '@angular/core';
import { PRODUCTS } from 'src/db-data';
import { Product } from './common/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products = PRODUCTS;
}
