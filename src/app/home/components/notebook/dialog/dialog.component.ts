import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

//SERVICIOS Y MODELOS
import { ProductsService } from './../../../../core/services/products/products.service'
import { Notebook } from './../../../../core/models/notebook.model';
import { CarShop } from './../../../../core/models/car-shop.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  formNotebook: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['code', 'name', 'count', 'price', 'discount', 'total'];
  dataSource!: MatTableDataSource<CarShop>;
  @ViewChild('paginator') paginator!: MatPaginator;
  carShop: CarShop[] = [];
  productForm!: CarShop


  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private dialogRef:  MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notebook
  ) { }

  ngOnInit(): void {
    this.carShop = [
      {
        code: 123456789,
        name: 'Producto de testeo',
        count: 2,
        price: 300,
        percentDiscount: 0,
        total: 10,
      },
      {
        code: 123456789,
        name: 'Producto de testeo',
        count: 2,
        price: 300,
        percentDiscount: 0,
        total: 10,
      },
      {
        code: 123456789,
        name: 'Producto de testeo',
        count: 2,
        price: 300,
        percentDiscount: 0,
        total: 10,
      }
    ];

    this.dataSource = new MatTableDataSource(this.carShop);
    this.dataSource.paginator  = this.paginator;

    this.formNotebook = this.formBuilder.group({
      codeBar: ['', Validators.required],
      name: ['', Validators.required],
      count: ['', Validators.required],
      price: ['', Validators.required],
      percentDiscount: ['', Validators.required],
      total: ['', Validators.required]
    });
  }


  searchProduct() {
    let id = this.formNotebook.controls['codeBar'].value
    this.productsService.get(id).subscribe((resp:any) => {
      this.productForm = resp[0].payload.doc.data();
      let name = this.productForm.name;
      let price = this.productForm.price;
      let percentDiscount = this.productForm.percentDiscount;

      this.formNotebook.controls['name'].setValue(name);
      this.formNotebook.controls['price'].setValue(price);
      this.formNotebook.controls['percentDiscount'].setValue(percentDiscount);
      this.formNotebook.controls['count'].setValue(1);
    });
  }

  test(event:any):void {
    console.log(event)
  }

}
