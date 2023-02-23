import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './pages/product-card/product-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CartStatusComponent } from './pages/cart-status/cart-status.component';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './pages/login-status/login-status.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './common/my-app-config';
import { ProductsService } from './shared/services/products-service/products.service';
import { HomeComponent } from './pages/home/home.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    NavbarComponent,
    ProductCardComponent,
    NotFoundComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    HomeComponent,
    FooterComponent,
    CartStatusComponent,
    CartDetailsComponent,
    LoginStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule,
  ],
  providers: [
    ProductsService,
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
