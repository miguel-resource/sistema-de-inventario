import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules} from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
     loadChildren: () => import('./home/home.module').then(modules => modules.HomeModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./products/products.module').then(modules => modules.ProductsModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./vendors/vendors.module').then(modules => modules.VendorsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
