import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Category } from './../../../core/models/categories.model';
import { Cate  } from './../../../core/models/category.model'
import { CategoriesService } from './../../../core/services/categories/categories.service';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {

  categories: Category[] = [];
  nombreCategoria: Cate[] = [];
  variable: string = '';
  valor: string = "";

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((resp:any) => {
      this.categories = resp.map((e:any) => {
        return {
          idFirebase: e.payload.doc.id,
          name: e.payload.doc.data().name,
          products: e.payload.doc.data().product
        }
      })

    })

  /*   this.productService.getCategory("OdOhXGfJx08lfJ8TNwOX").subscribe((doc:any) => {
      console.log(doc.payload.data().products ) ;
    }) */
  }

  inputFile(cadena:string):void {
    console.log(cadena);
  }

  showCategoria(value:any):any {
    this.productService.getCategory(value).subscribe((doc:any) => {
      this.nombreCategoria = doc.payload.data().products;
    })
  }


}
