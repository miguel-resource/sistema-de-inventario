import { Component, Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoriesService } from './../../../core/services/categories/categories.service'
import { Category } from './../../../core/models/categories.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notebook } from './../../../core/models/notebook.model'
import { ProductsService } from './../../../core/services/products/products.service'


@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {
  formProduct: FormGroup = new FormGroup({});
  categories: string[] = [];

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<DialogProductComponent>,
  ) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      codeBar: ['', Validators.required],
      name: ['', Validators.required],
      count: ['', Validators.required],
      price: ['', Validators.required],
      minValue: ['', Validators.required],
      percentDiscount: ['', Validators.required],
      priceDiscount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.categoriesService.getAll().subscribe((resp: any) => {
      this.categories = resp.map((e:any) => {
        return e.payload.doc.data().name;
      });
    })

  }


  createProduct():void {
    this.productsService.create(this.formProduct.value).then((product:any) => {
      this.formProduct.reset();
      this.dialogRef.close();
    }).catch((error:any) => {
      console.error(error);
    })
  }

  generateCode():void {
    this.formProduct.controls['codeBar'].setValue(Math.floor(Math.random()*200000000000)+9600000000000);
  }

  changePrice():void {
    let price = this.formProduct.controls['price'].value;
    let
  }

}
