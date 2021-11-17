import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
//Components
import { HomeComponent } from './home/home.component';
import { CardsInformationComponent } from './components/cards-information/cards-information.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { MaterialModule } from './../material/material.module';
import { DialogComponent } from './components/notebook/dialog/dialog.component'


@NgModule({
  declarations: [
    HomeComponent,
    CardsInformationComponent,
    NotebookComponent,
    DialogComponent,
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
  ]
})
export class HomeModule { }
