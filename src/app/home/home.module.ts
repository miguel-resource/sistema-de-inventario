import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//Components
import { HomeComponent } from './home/home.component';
import { CardsInformationComponent } from './components/cards-information/cards-information.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { MaterialModule } from './../material/material.module';
import { DialogNotebookComponent } from '../dialogs/dialog-notebook/dialog-notebook.component';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component'


@NgModule({
  declarations: [
    HomeComponent,
    CardsInformationComponent,
    NotebookComponent,
    DialogNotebookComponent,
    DialogConfirmComponent,
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class HomeModule { }
