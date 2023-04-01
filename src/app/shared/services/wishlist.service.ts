import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from './user.service';
import { of, tap, map, EMPTY } from 'rxjs';
import { WishlistResponse } from 'src/app/models/wishlist-response';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistItems: Wishlist[];
  userId: number;

  constructor(private http: HttpClient, private userService: UserService) {
    this.wishlistItems = [];
    this.checkUserState();
  }

  checkUserState() {
    this.userService.userState.subscribe((res) => {
      if (res) {
        this.userId = res.id;
      } else {
        this.wishlistItems = [];
      }
    });
  }

  postWishlistItem(wishlist) {
    return this.http.patch(
      `http://localhost:3000/signedUpUsersList/${this.userId}`,
      {
        wishlist: wishlist,
      }
    );
  }

  getWishlistItems() {
    if (this.userId) {
      return this.http
        .get(`http://localhost:3000/signedUpUsersList/${this.userId}`)
        .pipe(
          map((data: any) => {
            return data.wishlist;
          })
        );
    } else {
      return EMPTY;
    }
  }

  // removeWishlistItem(index: number) {
  //   return this.wishlistItems.splice(index, 1);
  // }
}
