import { Component, OnInit, ViewChild } from '@angular/core';

import { VendorsService } from 'src/app/core/services/vendors/vendors.service';
import { Vendor } from 'src/app/core/models/vendors.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-vendors',
  templateUrl: './table-vendors.component.html',
  styleUrls: ['./table-vendors.component.scss']
})
export class TableVendorsComponent implements OnInit {

  vendors: Vendor[] = [];
  displayedColumns: string[] = ['name', 'priceOrders', 'paid', 'toPay', 'products', 'actions'];
  filterName = '';
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Vendor>;

  constructor(
    private vendorService: VendorsService,
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

    }, (error: any) => {
      console.log(error);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
