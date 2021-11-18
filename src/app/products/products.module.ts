import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';


import { ProductsRoutingModule } from './products-routing.module';
import { TableProductComponent } from './components/table-product/table-product.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [
    ProductsComponent,
    TableProductComponent,
    FeaturedComponent
  ],
  imports: [
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule
  ]
})
export class ProductsModule { }
