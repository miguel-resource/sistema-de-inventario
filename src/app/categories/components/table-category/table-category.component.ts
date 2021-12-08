import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from './../dialog-category/dialog-category.component'

/* Model */
import { Category } from './../../../core/models/category.model'
import { Product } from './../../../core/models/product.model'

/* Services */
import { CategoriesService } from './../../../core/services/categories/categories.service';
import { ProductsService } from './../../../core/services/products/products.service';

/* DialogComponent */
import { DialogCategoriesComponent } from './../../../dialogs/dialog-categories/dialog-categories.component'
@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {

  categories: Category[] = []; //mat-toggle categorias
  products: Product[] = []; //mat-table products
  displayedColumns: string[] = [
    'id',
    'name',
    'view',
    'actions'
  ];
  nombreCategoria: string[] = [];
  subtitle: string = "";

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Category>

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((resp: any) => {
      this.categories = resp.map((e: any) => {
        return {
          idFirebase: e.payload.doc.id,
          name: e.payload.doc.data().name,
        }
      })
      this.dataSource = new MatTableDataSource(this.categories);
    });

    this.productService.getAll().subscribe((resp: any) => {
      this.products = resp.map((e: any) => {
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
      });

    })
  }

  inputFile(cadena: string): void {
    console.log(cadena);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  test(value: any) {
    this.categoryService.getCategory(value).subscribe((doc: any) => {
      this.nombreCategoria = doc.payload.data().products;
      this.nombreCategoria.forEach((productId: any) => {
        console.log(this.nombreCategoria)
        this.productService.get(productId).subscribe((resp: any) => {
          this.products = resp.map((e: any) => {
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

  createCategoryDialog(): void {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '400px'
    });
  }

  showProducts(name: string): void {
    this.productService.getByCategory(name).subscribe((resp: any) => {
      let data: Product[] = resp.map((e: any) => {
        return {
          codeBar: e.payload.doc.data().codeBar,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          minValue: e.payload.doc.data().minValue,
          percentDiscount: e.payload.doc.data().percentDiscount,
          category: e.payload.doc.data().category,
          date: e.payload.doc.data().date
        }
      });

      this.dialog.open(DialogCategoriesComponent, {
        data: data,
        width: '1000px'
      });
    })
  }

}
