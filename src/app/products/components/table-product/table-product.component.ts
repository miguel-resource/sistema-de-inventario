import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { ProductsService } from 'src/app/core/services/products/products.service';
import { Product } from 'src/app/core/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['codeBar', 'name', 'price','percentDiscount','priceDiscount','count','minValue','category', 'date', 'actions'];
  filterName = '';

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Product>;
  constructor(
    private productService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((resp: any) => {
      this.products = resp.map((e:any) => {
        return {
          codeBar: e.payload.doc.data().codeBar,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          minValue:  e.payload.doc.data().minValue,
          percentDiscount: e.payload.doc.data().percentDiscount,
          priceDiscount: e.payload.doc.data().priceDiscount,
          category: e.payload.doc.data().category,
          date: e.payload.doc.data().dateInit,
        }


      });
      this.dataSource = new MatTableDataSource(this.products);
    }, (error:any) => {
      console.log(error);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
