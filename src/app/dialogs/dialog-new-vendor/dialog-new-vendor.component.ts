import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from 'src/app/core/models/vendors.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductVendor } from 'src/app/core/models/product-vendor.model';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-dialog-new-vendor',
  templateUrl: './dialog-new-vendor.component.html',
  styleUrls: ['./dialog-new-vendor.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true },
  },
  ]
})
export class DialogNewVendorComponent implements OnInit {
  firstFormGroup: FormGroup | undefined;
  secondFormGroup: FormGroup | undefined;

  formVendor: FormGroup = new FormGroup({});
  displayedColumns: string[] = [
    'codeBar',
    'name',
    'price',
    'percentDiscount',
    'priceDiscount',
    'count',
    'minValue',
    'category',
    'date',
    'actions'
  ];
  dataSource!: MatTableDataSource<Vendor>
  productsVendors: ProductVendor[] = [];
  private _formBuilder: any;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vendor,
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

}
