import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  // { path: 'product/:sku', component: ProductDetailsComponent },
  { path: '', component: HomeComponent },
  { path: 'category/:id', component: ProductsComponent },
  { path: 'category', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
