import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { FooterComponent } from './components/footer/footer.component';


//Material
import { MaterialModule } from './../material/material.module'
@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule { }
