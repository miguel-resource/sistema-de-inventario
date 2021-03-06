import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

//SharedModule
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MaterialModule
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { ÉµAngularFireSchedulers } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DialogNotificationComponent } from './dialogs/dialog-notification/dialog-notification.component';
import { DialogSuccesfulyComponent } from './dialogs/dialog-succesfuly/dialog-succesfuly.component';
import { DialogShoppingComponent } from './dialogs/dialog-shopping/dialog-shopping.component';
import { DialogCategoriesComponent } from './dialogs/dialog-categories/dialog-categories.component';
import { DialogNewVendorComponent } from './dialogs/dialog-new-vendor/dialog-new-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DialogNotificationComponent,
    DialogSuccesfulyComponent,
    DialogShoppingComponent,
    DialogCategoriesComponent,
    DialogNewVendorComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
