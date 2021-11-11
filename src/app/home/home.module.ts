import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

//Components
import { HomeComponent } from './home/home.component';
import { CardsInformationComponent } from './components/cards-information/cards-information.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { MaterialModule } from './../material/material.module'

@NgModule({
  declarations: [
    HomeComponent,
    CardsInformationComponent,
    NotebookComponent
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class HomeModule { }
