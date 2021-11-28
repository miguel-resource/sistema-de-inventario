import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { TableProductComponent } from './components/table-product/table-product.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { MaterialModule } from './../material/material.module';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    TableProductComponent,
    FeaturedComponent,
    DialogProductComponent,
  ],
  imports: [
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class ProductsModule { }
