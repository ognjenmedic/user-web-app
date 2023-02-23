import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  userFullName: string;
  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.isAuthenticated = false;
    this.userFullName = '';
  }

  ngOnInit(): void {
    // subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user's details (user's claim)
      //
      // user full name is esposed as a property name
      this.oktaAuth.getUser().then((res) => {
        this.userFullName = res.name as string;
      });
    }
  }
  logout() {
    // terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut;
  }
}
