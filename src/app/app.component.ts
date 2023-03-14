import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';

// import { PRODUCTS } from 'src/db-data';
// import { Product } from './common/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit() {
    const userState = window.localStorage.getItem('user');
    if (userState) {
      this.userService.userState.next(JSON.parse(userState));
    }
  }
}
