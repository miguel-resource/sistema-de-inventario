import { Component, OnInit, ViewChild } from '@angular/core';

import { ShoppingService } from './../../../core/services/shoppign/shopping.service'
import { Shopping } from './../../../core/models/shopping.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit {

  shopping: Shopping[] = [];
  displayedColumns: string[] = ['id', 'date' , 'total', 'view', 'actions']
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Shopping>;
  date: string = "";

  filterName = '';

  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.shoppingService.getAll().subscribe((resp: any) => {
      this.shopping = resp.map((e:any) => {
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

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
