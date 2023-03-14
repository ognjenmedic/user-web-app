import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  index: number;
  constructor(private cartService: CartService) {
    this.cartItems = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    // subscribe to the cart totalPrice
    this.cartService.totalPrice$.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity$.subscribe(
      (data) => (this.totalQuantity = data)
    );
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  removeCartItem(index: number) {
    this.cartService.removeCartItem(index);
    this.cartService.computeCartTotals();
    // this.listCartDetails();
  }
}
