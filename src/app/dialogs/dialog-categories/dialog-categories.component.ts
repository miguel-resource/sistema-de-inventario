import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

/* Models */
import { Product } from './../../core/models/product.model'

@Component({
  selector: 'app-dialog-categories',
  templateUrl: './dialog-categories.component.html',
  styleUrls: ['./dialog-categories.component.scss']
})

export class DialogCategoriesComponent implements OnInit {

  dataSource!: MatTableDataSource<Product>
  displayedColumns: string[] = [
    'codeBar',
    'name',
    'count',
    'minValue',
    'price',
    'percentDiscount',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product[],
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
