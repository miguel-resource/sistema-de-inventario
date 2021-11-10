import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { FooterComponent } from './components/footer/footer.component';

//Material
import { MaterialModule } from './../material/material.module';
import { DateComponent } from './components/date/date.component';

@NgModule({
  declarations: [
    FooterComponent,
    DateComponent
  ],
  exports: [
    FooterComponent,
    DateComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule { }
