import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './catalog/author/author.component';
import { AuthorEditComponent } from './catalog/author-edit/author-edit.component';
import { CategoryComponent } from './catalog/category/category.component';
import { CategoryEditComponent } from './catalog/category-edit/category-edit.component';
import { EditorialComponent } from './catalog/editorial/editorial.component';
import { EditorialEditComponent } from './catalog/editorial-edit/editorial-edit.component';
import { DocumentComponent } from './catalog/document/document.component';
import { DocumentEditComponent } from './catalog/document-edit/document-edit.component';
import { LoginComponent } from './catalog/login/login.component';
import { ReportComponent } from './reports/report/report.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'author', component: AuthorComponent},
  {path: 'add-author', component: AuthorEditComponent},
  {path: 'author/:authorId/edit', component: AuthorEditComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'add-category', component: CategoryEditComponent},
  {path: 'category/:categoryId/edit', component: CategoryEditComponent},
  {path: 'editorial', component: EditorialComponent},
  {path: 'add-editorial', component: EditorialEditComponent},
  {path: 'editorial/:editorialId/edit', component: EditorialEditComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'add-document', component: DocumentEditComponent},
  {path: 'document/:documentId/edit', component: DocumentEditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'report', component: ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
