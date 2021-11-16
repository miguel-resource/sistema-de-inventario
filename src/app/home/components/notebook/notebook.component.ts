import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notebook } from './../../../core/models/notebook.model'

//Service
import { NotebookService } from './../../../core/services/notebook/notebook.service'
@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {

  notas: Notebook[] = [];
  displayedColumns: string[] = ['Cantidad', 'Nombre', 'Precio', 'Hora','Acciones'];

  constructor(
    private notebookService: NotebookService
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
    }, (err: any) => {
      console.log(err);
    })

    console.log(this.notas);
  }


  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Notebook>;





  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.notas);
    this.dataSource.paginator = this.paginator;
  }



}
