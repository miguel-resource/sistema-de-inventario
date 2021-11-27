import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { TableCategoryComponent } from './components/table-category/table-category.component';
import { CategoriesRoutingModule } from './categories-routing.module'
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    TableCategoryComponent,
    DialogCategoryComponent
  ],
  imports: [
    CategoriesRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule
  ]
})
export class CategoriesModule { }
