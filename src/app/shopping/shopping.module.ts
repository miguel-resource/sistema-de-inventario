import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping/shopping.component';
import { TableGeneralComponent } from './components/table-general/table-general.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MaterialModule } from '../material/material.module';

import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    ShoppingComponent,
    TableGeneralComponent
  ],
  imports: [
    ShoppingRoutingModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class ShoppingModule { }
