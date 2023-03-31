import { Product } from 'src/app/common/product';
import { Product } from './product';

export class CartItem {
  quantity: number;
  product: Product;

  constructor(product: Product) {
    this.product = product.Product;
    this.quantity = 1;
  }
}
