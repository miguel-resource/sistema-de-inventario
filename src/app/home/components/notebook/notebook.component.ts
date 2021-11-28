import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notebook } from './../../../core/models/notebook.model'

//Service
import { NotebookService } from './../../../core/services/notebook/notebook.service'

//Import
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {

  notas: Notebook[] = [];
  displayedColumns: string[] = ['Cantidad', 'Nombre', 'Precio','Acciones'];
  filterName = '';
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Notebook>;
  data: Notebook[] = [];

  constructor(
    private notebookService: NotebookService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.notebookService.getAll().subscribe((resp: any) => {
      this.notas = resp.map((e: any) => {
        return {
          count: e.payload.doc.data().count,
          name: e.payload.doc.data().name,
          price: e.payload.doc.data().price,
          hour: e.payload.doc.data().hour,
        }
      })

      this.dataSource = new MatTableDataSource(this.notas);
      this.dataSource.paginator = this.paginator;

    }, (err: any) => {
      console.log(err);
    })

    this.data = this.notas;
  }


  createNote():void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '900px'
    });
  }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
  /*   const newValor = this.notas.filter((resp)=> {
      return resp.name.toLowerCase().indexOf(filterValue) !== -1;
    })

    console.log(newValor);

    return newValor;
 */
    this.dataSource.filter = filterValue;
  }



}
