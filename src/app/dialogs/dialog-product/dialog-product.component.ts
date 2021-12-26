import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories/categories.service'
import { Product } from '../../core/models/product.model'
import { Category } from '../../core/models/categories.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notebook } from '../../core/models/notebook.model'
import { ProductsService } from '../../core/services/products/products.service'
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';


//Components
import { DialogSuccesfulyComponent } from './../dialog-succesfuly/dialog-succesfuly.component';

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
    private dialogSuccesfully: MatDialog
  ) {}

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

    this.formProduct.controls['priceDiscount'].disable();

    this.categoriesService.getAll().subscribe((resp: any) => {
      this.categories = resp.map((e: any) => {
        return e.payload.doc.data().name;
      });
    })

  }


  createProduct(): void {
    let product: Product = {
      codeBar: this.formProduct.controls['codeBar'].value,
      name: this.formProduct.controls['name'].value,
      count: this.formProduct.controls['count'].value,
      price: this.formProduct.controls['price'].value,
      minValue: this.formProduct.controls['minValue'].value,
      percentDiscount: this.formProduct.controls['percentDiscount'].value,
      priceDiscount: this.formProduct.controls['priceDiscount'].value,
      category: this.formProduct.controls['category'].value,
      date: String(this.formProduct.controls['date'].value)
    }

    this.productsService.create(product).then(() => {
      this.dialogSuccesfully.open(DialogSuccesfulyComponent, {
        data: 'Nuevo producto!',
        minWidth: '300px'
      });
      this.dialogRef.close();
    })
  }

  generateCode(): void {
    this.formProduct.controls['codeBar'].setValue(Math.floor(Math.random() * 200000000000) + 9600000000000);
  }

  changePrice(): void {
    let price = this.formProduct.controls['price'].value;
    let percentDiscount = (this.formProduct.controls['percentDiscount'].value) / 100;

    let total = price - (price * percentDiscount);
    this.formProduct.controls['priceDiscount'].setValue(total);
  }


}
