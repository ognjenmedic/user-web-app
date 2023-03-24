import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Wishlist } from 'src/app/models/wishlist';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.productName}, ${product.unitPrice}`);

    console.log(product);
    const addedCartItem = new CartItem(product);
    this.cartService.addToCart(addedCartItem);
  }
  addItemToWishlist(product: Product) {
    let wishlist;
    this.wishlistService.getWishlistItems().subscribe((res) => {
      wishlist = res;
      console.log(wishlist);
      let addedWishlistItem = new Wishlist(product); // new item to be added
      wishlist.push(product);

      let existingWishlistItem = this.wishlistService.wishlistItems.find(
        (item) => item.sku === addedWishlistItem.sku
      );
      if (existingWishlistItem) {
        alert('Product already in Wish List!');
      } else {
        this.wishlistService.wishlistItems.push(addedWishlistItem);

        this.wishlistService.postWishlistItem(wishlist).subscribe((res) => {
          alert('Product added to Wish List!');
        });
      }
    }); // existing wishlist
  }
}
