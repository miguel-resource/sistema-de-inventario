import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Notebook } from './../../core/models/notebook.model'

//Materials
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dialog-shopping',
  templateUrl: './dialog-shopping.component.html',
  styleUrls: ['./dialog-shopping.component.scss']
})
export class DialogShoppingComponent implements OnInit {

  dataSource!: MatTableDataSource<Notebook>
  displayedColumns: string[] = [
    'name',
    'count',
    'price',
    'percentDiscount',
    'date',
    'total'
  ];
  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Notebook[],
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
