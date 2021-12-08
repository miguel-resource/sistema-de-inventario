import { Component, OnInit } from '@angular/core';

/*Services*/
import { NotebookService } from './../../../core/services/notebook/notebook.service'
import { CategoriesService } from './../../../core/services/categories/categories.service'
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-cards-information',
  templateUrl: './cards-information.component.html',
  styleUrls: ['./cards-information.component.scss']
})
export class CardsInformationComponent implements OnInit {

  totalByDay: number[] = [];
  categories: any[] = [];
  products: any[] = [];

  totalCategories: number = 0;
  totalProducts: number = 0;
  total: number = 0;

  constructor(
    private notebookService: NotebookService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.notebookService.getAll().subscribe((resp: any) => {
      this.totalByDay = resp.map((e: any) => {
        return e.payload.doc.data().total;
      });
      this.total = 0;

      this.totalByDay.forEach((item: any)  => {
        this.total+=item;
      })
    })

    this.categoriesService.getAll().subscribe((resp: any) => {
      this.categories = resp.map((e: any) => {
        return e.payload.doc.data()
      })
      this.totalCategories = this.categories.length;
    })

    this.productsService.getAll().subscribe((resp: any) => {
      this.products = resp.map((e: any) => {
        return e.payload.doc.data();
      });

      this.totalProducts = this.products.length;

    })
  }

}
