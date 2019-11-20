import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizatedGuard } from './guard/authorizated.guard';


import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './catalog/author/author.component';
import { AuthorEditComponent } from './catalog/author-edit/author-edit.component';
import { CategoryComponent } from './catalog/category/category.component';
import { CategoryEditComponent } from './catalog/category-edit/category-edit.component';
import { EditorialComponent } from './catalog/editorial/editorial.component';
import { EditorialEditComponent } from './catalog/editorial-edit/editorial-edit.component';
import { DocumentComponent } from './catalog/document/document.component';
import { DocumentEditComponent } from './catalog/document-edit/document-edit.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './reports/report/report.component';
import { DocumentsComponent } from './reports/documents/documents.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'assets/documents/:pdf', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:categoryId', component: HomeComponent, canActivate: [ AuthorizatedGuard ] },
  {path: 'home/:buscarId/buscar', component: HomeComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'author', component: AuthorComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'add-author', component: AuthorEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'author/:authorId/edit', component: AuthorEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'category', component: CategoryComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'add-category', component: CategoryEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'category/:categoryId/edit', component: CategoryEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'editorial', component: EditorialComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'add-editorial', component: EditorialEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'editorial/:editorialId/edit', component: EditorialEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'document', component: DocumentComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'add-document', component: DocumentEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'document/:documentId/edit', component: DocumentEditComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'login', component: LoginComponent},
  {path: 'report', component: ReportComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'reports', component: DocumentsComponent, canActivate: [ AuthorizatedGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
