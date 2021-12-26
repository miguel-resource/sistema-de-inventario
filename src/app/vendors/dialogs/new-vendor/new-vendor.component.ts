import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

/* Services */
import { ProductsService } from './../../../core/services/products/products.service'

/* Models */
import { ProductVendor } from './../../../core/models/product-vendor.model';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss']
})
export class NewVendorComponent implements OnInit {
  formName: FormGroup = new FormGroup({});
  formAddProduct: FormGroup = new FormGroup({});
  isProduct: boolean = false;
  productVendor!: ProductVendor;

  /* Datos del producto */

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formName = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.formAddProduct = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      priceUnity: ['', Validators.required],
      pricePlus: ['', Validators.required]
    });

    this.productsService.getAll().subscribe((resp: any) =>{

    })
  }

  searchProdut():void {
    let id = parseInt(this.formAddProduct.controls['code'].value);
    this.productsService.get(id).suscribe((resp:any) => {
      this.productVendor = resp[0].payload.doc.data();

    })
  }

}
