import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './auth/login/login.component';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/:productSku', component: ProductDetailsComponent },
  { path: 'products/:categoryId', component: ProductsComponent }, // added new 19 feb
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', component: CategoriesComponent },
  // { path: 'category/:id', component: ProductsComponent },
  { path: 'categories', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
