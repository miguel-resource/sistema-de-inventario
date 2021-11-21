import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Category } from './../../../core/models/categories.model';
import { Cate  } from './../../../core/models/category.model'
import { Product } from './../../../core/models/product.model'
import { CategoriesService } from './../../../core/services/categories/categories.service';
import { ProductsService } from './../../../core/services/products/products.service';
@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  nombreCategoria: string[] = [];
  variable: string = '';
  carro: string = "";


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
          products: e.payload.doc.data().products
        }
      })
    });

    this.productService.getAll().subscribe((resp:any) => {
      this.products = resp.map((e:any) => {
        return {
          codeBar: e.payload.doc.data().codeBar,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          minValue: e.payload.doc.data().minValue,
          percentDiscount: e.payload.doc.data().percentDiscount,
          priceDiscount: e.payload.doc.data().priceDiscount,
          category: e.payload.doc.data().category,
          date: e.payload.doc.data().date

        }
      })
    })

    this.showCategoria('aND8wmHOD0q1TwNJYznx')

  }

  inputFile(cadena:string):void {
    console.log(cadena);
  }

  showCategoria(idCategory:any):any {
    this.categoryService.getCategory(idCategory).subscribe((doc:any) => {
      this.nombreCategoria = doc.payload.data().products;
      this.nombreCategoria.forEach((productId:any) => {
        console.log(productId);
      })
    })

  }

  getProducts(id:any):any {
    this.productService.getByCategory(id).subscribe((resp:any) => {
      this.products = resp.map((e:any) => {
        return {
          codeBar: e.payload.doc.data().codeBar,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          minValue: e.payload.doc.data().minValue,
          percentDiscount: e.payload.doc.data().percentDiscount,
          priceDiscount: e.payload.doc.data().priceDiscount,
          category: e.payload.doc.data().category,
          date: e.payload.doc.data().date
        }
      })

      console.log(this.products);

    })
  }

  test(value:any) {
    this.categoryService.getCategory(value).subscribe((doc:any) => {
      this.nombreCategoria = doc.payload.data().products;
      this.nombreCategoria.forEach((productId:any) => {
        console.log(this.nombreCategoria)
        this.productService.get(productId).subscribe((resp:any) => {
          this.products = resp.map((e:any) => {
            return {
              codeBar: e.payload.doc.data().codeBar,
              name: e.payload.doc.data().name,
              count: e.payload.doc.data().count,
              price: e.payload.doc.data().price,
              minValue: e.payload.doc.data().minValue,
              percentDiscount: e.payload.doc.data().percentDiscount,
              priceDiscount: e.payload.doc.data().priceDiscount,
              category: e.payload.doc.data().category,
              date: e.payload.doc.data().date
            }
          })

        })
      })
    })
  }


}
