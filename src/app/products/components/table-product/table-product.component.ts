import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogProductComponent } from '../../../dialogs/dialog-product/dialog-product.component'

/* Servicios */
import { ProductsService } from 'src/app/core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

/* Modelos */
import { Category } from './../../../core/models/categories.model'

import { Product } from 'src/app/core/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent implements OnInit {

  products: Product[] = [];
  producsSort: Product[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['codeBar', 'name', 'price', 'percentDiscount', 'priceDiscount', 'count', 'minValue', 'category','vendors', 'date', 'actions'];
  nameCategory: string = '';
  filterName = '';

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Product>;
  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((resp: any) => {
      console.log(resp.length);
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
          date: e.payload.doc.data().date,
        }

      });
      this.dataSource = new MatTableDataSource(this.products);
      this.producsSort = this.products;
      this.dataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });


    this.categoryService.getAll().subscribe((resp: any) => {
      this.categories = resp.map((e: any) => {
        return {
          idFirebase: e.payload.doc.id,
          name: e.payload.doc.data().name
        }
      })
    })


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  cancellFilter(): void {
    this.dataSource.filter = "Central"; //Común denomiador xd
  }

  showCategory(idVale: string) {
    this.categoryService.get(idVale).subscribe((doc: any) => {
      this.nameCategory = doc.payload.data().name
      console.log(this.nameCategory)
      return this.nameCategory.toString();
    });
  }

  test(e: string) {
    return e;
  }


  createProductDialog(): void {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '1000px'
    });
  }
}
