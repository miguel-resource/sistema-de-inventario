import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { VendorsService } from 'src/app/core/services/vendors/vendors.service';

/* Models */
import { Vendor } from 'src/app/core/models/vendors.model'

/* Material */
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

/* Dialgos */
import { NewVendorComponent } from './../../dialogs/new-vendor/new-vendor.component'

@Component({
  selector: 'app-table-vendors',
  templateUrl: './table-vendors.component.html',
  styleUrls: ['./table-vendors.component.scss']
})
export class TableVendorsComponent implements OnInit {

  vendors: Vendor[] = [];
  displayedColumns: string[] = ['name', 'priceOrders', 'paid', 'toPay', 'actions'];
  filterName = '';
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Vendor>;

  constructor(
    private vendorService: VendorsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.vendorService.getAll().subscribe((resp: any) => {
      this.vendors = resp.map((e: any) => {
        return {
          name: e.payload.doc.data().name,
          priceOrders: e.payload.doc.data().priceOrders,
          paid: e.payload.doc.data().paid,
          toPay: e.payload.doc.data().toPay,
          products: e.payload.doc.data().products,
        }
      });
      this.dataSource = new MatTableDataSource(this.vendors);
      this.dataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  newVendor(): void {
    const dialogRef = this.matDialog.open(NewVendorComponent, {
      width: '1000px'
    });
  }




}
