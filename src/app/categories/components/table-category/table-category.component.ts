import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { throwIfEmpty } from 'rxjs';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogCategoryComponent } from './../dialog-category/dialog-category.component'
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

  categories: Category[] = []; //mat-toggle categorias
  products: Product[] = []; //mat-table products
  displayedColumns : string [] = ['codeBar', 'name', 'price','percentDiscount','priceDiscount','count','minValue','category', 'date', 'actions'];
  nombreCategoria: string[] = [];
  subtitle: string = "";

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Product>

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService,
    public dialog: MatDialog
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
      });
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    })
  }

  inputFile(cadena:string):void {
    console.log(cadena);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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

  createCategoryDialog():void {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '400px'
    });
  }

}
