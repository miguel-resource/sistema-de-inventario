import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';

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
    CommonModule
  ]
})
export class VendorsModule { }
