import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';


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
import { LoginComponent } from './login/login.component';
import { CabezaComponent } from './catalog/cabeza/cabeza.component';
import { PieComponent } from './catalog/pie/pie.component';
import { ReportComponent } from './reports/report/report.component';
import { DocumentsComponent } from './reports/documents/documents.component';
<<<<<<< HEAD
=======
import { AuthorizatedGuard } from './guard/authorizated.guard';
import { StorageService } from './service/storage.service';
import { DatePipe } from '@angular/common';
import { AuthInterceptorService } from './service/auth-interceptor.service';
>>>>>>> 9cdb3ace32d859581053bd175d6816a96ff16211




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
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    }),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    AuthorizatedGuard,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi : true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
