import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { TableCategoryComponent } from './components/table-category/table-category.component';
import { CategoriesRoutingModule } from './categories-routing.module'
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    CategoriesComponent,
    TableCategoryComponent,
  ],
  imports: [
    CategoriesRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class CategoriesModule { }
