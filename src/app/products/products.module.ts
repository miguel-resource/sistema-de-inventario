import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';


import { ProductsRoutingModule } from './products-routing.module';
import { TableProductComponent } from './components/table-product/table-product.component';
import { FeaturedComponent } from './components/featured/featured.component';

@NgModule({
  declarations: [
    ProductsComponent,
    TableProductComponent,
    FeaturedComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule
  ]
})
export class ProductsModule { }
