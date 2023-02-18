import { Product } from './product';

export class CartItem {
  sku: number;
  productName: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(product: Product) {
    this.sku = product.sku;
    this.productName = product.productName;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.quantity = 1;
  }
}
