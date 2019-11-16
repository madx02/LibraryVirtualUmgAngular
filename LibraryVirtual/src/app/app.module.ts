import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorComponent } from './catalog/author/author.component';
import { AuthorEditComponent } from './catalog/author-edit/author-edit.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './catalog/category/category.component';
import { CategoryEditComponent } from './catalog/category-edit/category-edit.component';
import { EditorialComponent } from './catalog/editorial/editorial.component';
import { EditorialEditComponent } from './catalog/editorial-edit/editorial-edit.component';
import { DocumentComponent } from './catalog/document/document.component';
import { DocumentEditComponent } from './catalog/document-edit/document-edit.component';
import { LoginComponent } from './catalog/login/login.component';
import { CabezaComponent } from './catalog/cabeza/cabeza.component';
import { PieComponent } from './catalog/pie/pie.component';
import { ReportComponent } from './reports/report/report.component';
import { DocumentsComponent } from './reports/documents/documents.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthorEditComponent,
    HomeComponent,
    CategoryComponent,
    CategoryEditComponent,
    EditorialComponent,
    EditorialEditComponent,
    DocumentComponent,
    DocumentEditComponent,
    LoginComponent,
    CabezaComponent,
    PieComponent,
    ReportComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
