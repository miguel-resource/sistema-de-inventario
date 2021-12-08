import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//Services and models
import { ShoppingService } from './../../../core/services/shoppign/shopping.service'
import { Notebook } from './../../../core/models/notebook.model'
import { MatDialog } from '@angular/material/dialog';
import { Shopping } from './../../../core/models/shopping.model'

//Components
import { DialogShoppingComponent } from './../../../dialogs/dialog-shopping/dialog-shopping.component'

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit {

  shopping: Shopping[] = [];
  displayedColumns: string[] = ['id', 'date', 'total', 'view']
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Shopping>;
  date: string = "";
  products: Notebook[] = [];
  filterName = '';

  constructor(
    private shoppingService: ShoppingService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.shoppingService.getAll().subscribe((resp: any) => {
      this.shopping = resp.map((e: any) => {
        return {
          idInterface: e.payload.doc.id,
          date: e.payload.doc.data().date,
          total: e.payload.doc.data().total,
          products: e.payload.doc.data().products
        }
      });


      this.dataSource = new MatTableDataSource(this.shopping)
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      console.log(err);
    })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showProducts(id: string): void {
    this.shoppingService.get(id).subscribe((resp: any) => {
      this.products = resp.data().products;
      this.dialog.open(DialogShoppingComponent, {
        data: this.products,
        width: '900px',
      })
    })
  }

}
