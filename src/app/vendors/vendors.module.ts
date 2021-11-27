import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';
import { FormsModule } from '@angular/forms';

import { VendorsRoutingModule } from './vendors-routing.module';
import { MaterialModule } from './../material/material.module';
import { FeaturedComponent } from './components/featured/featured.component';
import { TableVendorsComponent } from './components/table-vendors/table-vendors.component';


@NgModule({
  declarations: [
    VendorsComponent,
    FeaturedComponent,
    TableVendorsComponent
  ],
  imports: [
    VendorsRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule
  ]
})
export class VendorsModule { }
