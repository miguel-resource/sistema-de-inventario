import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

//SERVICIOS Y MODELOS
import { ProductsService } from '../../core/services/products/products.service'
import { CarShopService } from '../../core/services/carShop/car-shop.service'
import { NotebookService } from '../../core/services/notebook/notebook.service'
import { Notebook } from '../../core/models/notebook.model';
import { CarShop } from '../../core/models/car-shop.model';

//Components
import { DialogConfirmComponent } from './../dialog-confirm/dialog-confirm.component'
import { DialogSuccesfulyComponent } from '../dialog-succesfuly/dialog-succesfuly.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-notebook.component.html',
  styleUrls: ['./dialog-notebook.component.scss']
})
export class DialogNotebookComponent implements OnInit {
  formNotebook: FormGroup = new FormGroup({});
  formChange: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['code', 'name', 'count', 'price', 'discount', 'total', 'actions'];
  dataSource!: MatTableDataSource<CarShop>;
  carShop: CarShop[] = [];
  productForm!: CarShop;

  totalTable: number[] = [];
  total: number = 0;
  totalChange: number = 0;


  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(
    private productsService: ProductsService,
    private carShopService: CarShopService,
    private notebookService: NotebookService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogNotebookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notebook,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carShopService.getAll().subscribe((resp: any) => {
      this.carShop = resp.map((e: any) => {
        return {
          code: e.payload.doc.data().code,
          name: e.payload.doc.data().name,
          count: e.payload.doc.data().count,
          price: e.payload.doc.data().price,
          percentDiscount: e.payload.doc.data().percentDiscount,
          date: e.payload.doc.data().date,
          total: e.payload.doc.data().total
        }
      })
      this.dataSource = new MatTableDataSource(this.carShop);
      this.dataSource.paginator = this.paginator;
    })

    /*Sumar todos los valores totales de la tabla*/
    this.carShopService.getAll().subscribe((resp: any) => {
      this.totalTable = resp.map((e: any) => {
        return e.payload.doc.data().total;
      });

      this.totalTable.forEach((item: any) => {
        this.total += item;
      })

      console.log(this.total);
    })


    this.formNotebook = this.formBuilder.group({
      codeBar: ['', Validators.required],
      name: ['', Validators.required],
      count: ['', Validators.required],
      price: ['', Validators.required],
      percentDiscount: ['', Validators.required],
      total: ['', Validators.required]
    });

    this.formChange = this.formBuilder.group({
      change: ['', Validators.required]
    });
  }

  /*Busca todos productos dentro de la base de datos*/
  searchProduct() {
    let id = parseInt(this.formNotebook.controls['codeBar'].value);
    this.productsService.get(id).subscribe((resp: any) => {
      this.productForm = resp[0].payload.doc.data();
      this.formNotebook.controls['count'].setValue(1);

      let count = this.formNotebook.controls['count'].value;
      let name = this.productForm.name;
      let price = this.productForm.price;
      let percent = this.productForm.percentDiscount;
      let percentDiscount = percent / 100;
      let total = (price - (price * percentDiscount)) * count;

      this.formNotebook.controls['name'].setValue(name);
      this.formNotebook.controls['price'].setValue(price);
      this.formNotebook.controls['percentDiscount'].setValue(percent);
      this.formNotebook.controls['total'].disable();
      this.formNotebook.controls['percentDiscount'].disable();
      this.formNotebook.controls['total'].setValue(total);
    });
  }

  updatePrice(): void {
    let count = this.formNotebook.controls['count'].value;
    let price = this.productForm.price;
    let percent = this.productForm.percentDiscount;
    let percentDiscount = percent / 100;
    let total = (price - (price * percentDiscount)) * count;

    console.log(total);
    this.formNotebook.controls['total'].setValue(total);
  }

  addProduct(): void {
    let product = {
      code: this.formNotebook.controls['codeBar'].value,
      name: this.formNotebook.controls['name'].value,
      count: this.formNotebook.controls['count'].value,
      price: this.formNotebook.controls['price'].value,
      percentDiscount: this.formNotebook.controls['percentDiscount'].value,
      date: Date.now(),
      total: this.formNotebook.controls['total'].value,
    }

    console.log(product);
    this.total = 0;
    this.carShopService.create(product).then(() => {
      this.formNotebook.reset();
      this.updateTotal();
      this.total = 0;
    })

  }

  updateTotal(): void {
    let change = this.formChange.controls['change'].value;
    console.log(change);

    this.totalChange = change - this.total;

    if (this.totalChange <= 0) {
      this.totalChange = 0;
    }
  }

  delateAll(): void {
    this.carShopService.delete().subscribe((resp: any) => {
      resp.forEach((item: any) => {
        item.ref.delete();
      });
      this.dialogRef.close();
    })
  }

  cancellPay(): void {
    this.dialog.open(DialogConfirmComponent, {
      data: '¿Deseas cancelar la compra?'
    }).afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.carShopService.delete().subscribe((resp: any) => {
          resp.forEach((item: any) => {
            item.ref.delete();
          });
          this.dialogRef.close();
        })
      }
    })
  }

  acceptPay(): void {
    let tableData = this.dataSource.data;
    tableData.forEach((item: any) => {
      this.notebookService.create(item).then(() => {
        this.delateAll();
        this.dialogRef.close();
      });
    });
    this.dialog.open(DialogSuccesfulyComponent, {
      data: `Venta realizada, cambio $${this.totalChange}`,
      minWidth: '330px'
    });
  }

}
