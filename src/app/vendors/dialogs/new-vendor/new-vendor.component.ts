import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {SelectionModel} from '@angular/cdk/collections';
/* Services */
import { ProductsService } from './../../../core/services/products/products.service'

/* Models */
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { MatTableDataSource } from '@angular/material/table';

/* Models */
import { ProductVendor } from './../../../core/models/product-vendor.model';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss']
})
export class NewVendorComponent implements OnInit {
  formName: FormGroup = new FormGroup({});
  namesOption: string[] = [];
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'priceUnity',
    'priceMay'
  ];
  productsVendors: ProductVendor[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  /* Datos del producto */
  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    /* Get name's products */
    this.productsService.getAll().subscribe((resp: any) => {
      this.productsVendors = resp.map((e: any) => {
        return {
          code: e.payload.doc.data().codeBar,
          name: e.payload.doc.data().name
        }
      });

      this.dataSource = new MatTableDataSource(this.productsVendors);

    }, (err: any) => {
      console.log(err);
    });


    /* FormsGroups */
    this.formName = this.formBuilder.group({
      name: ['', Validators.required]
    });


  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


}
