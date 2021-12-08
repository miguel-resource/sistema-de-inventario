import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//Service y models
import { NotebookService } from './../../../core/services/notebook/notebook.service'
import { ShoppingService } from './../../../core/services/shoppign/shopping.service'
import { Shopping } from './../../../core/models/shopping.model'
import { Notebook } from './../../../core/models/notebook.model'

import { MatDialog } from '@angular/material/dialog';
import { DialogNotebookComponent } from '../../../dialogs/dialog-notebook/dialog-notebook.component';
import { DialogConfirmComponent } from '../../../dialogs/dialog-confirm/dialog-confirm.component'

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {

  notas: Notebook[] = [];
  displayedColumns: string[] = [
    'name',
    'count',
    'price',
    'percentDiscount',
    'date',
    'total',
    'actions'
  ];
  filterName = '';
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Notebook>;
  data: Notebook[] = [];
  totalTable: number[] = [];
  total: number = 0;

  constructor(
    private shoppingService: ShoppingService,
    private notebookService: NotebookService,
    private dialog: MatDialog,
    private dialogConfirm: MatDialog
  ) { }

  ngOnInit(): void {
    this.notebookService.getAll().subscribe((resp: any) => {
      this.notas = resp.map((e: any) => {
        return {
          idFirebase: e.payload.doc.id,
          code: e.payload.doc.data().code,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          percentDiscount: e.payload.doc.data().percentDiscount,
          date: e.payload.doc.data().date,
          total: e.payload.doc.data().total
        }
      });

      this.total = 0;

      this.totalTable = resp.map((e: any) => {
        return e.payload.doc.data().total

      }).forEach((item: any) => {
        this.total += item
      })



      this.dataSource = new MatTableDataSource(this.notas);
      this.data = this.dataSource.data;

    }, (err: any) => {
      console.log(err);
    })
  }


  createNote(): void {
    const dialogRef = this.dialog.open(DialogNotebookComponent, {
      width: '1200px'
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delateAll(): void {
    this.notebookService.delete().subscribe((resp: any) => {
      resp.forEach((item: any) => {
        item.ref.delete();
      });
    })
  }


  createShop(): void {
    this.dialogConfirm.open(DialogConfirmComponent,  {
      data: '¿Deseas cerrar caja?'
    }).afterClosed().subscribe((confirm:boolean) => {
      if (confirm) {
        let shop: Shopping = {
          date: Date.now(),
          total: this.total,
          products: this.data
        }

        this.shoppingService.create(shop).then(() => {
          this.delateAll();
          alert("Shopping created successfully and the money was  " + this.total);
        })
      }
    })
  }

  delete(id: string): void{
    this.dialogConfirm.open(DialogConfirmComponent, {
      data: '¿Deseas hacer la devolución de este producto?'
    }).afterClosed().subscribe((confirm:boolean) => {
      if(confirm) {
        this.notebookService.deleteById(id);
      }
    })
  }



}
