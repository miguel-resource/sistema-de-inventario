import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notebook } from './../../../core/models/notebook.model'
@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  constructor() { }

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Notebook>;


  data: Notebook[] = [
    {count:2, name: 'vitacilina', price: 200.2},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},
    {count:2, name: 'vitacilina', price: 200},

  ]


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['Cantidad', 'Nombre', 'Precio', 'Acciones'];

  ngOnInit(): void {
    console.log(this.data);
  }

}
