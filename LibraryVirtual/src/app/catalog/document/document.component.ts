import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Author } from '../../model/author';
import { Category } from '../../model/category';
import { Country } from '../../model/country';
import { Editorial } from '../../model/editorial';
import { Lenguaje } from '../../model/lenguaje';
import { SystemUser } from '../../model/system-user';
import { Document } from '../../model/document';

import { AuthorService } from '../../service/author.service';
import { CategoryService } from '../../service/category.service';
import { CountryService } from '../../service/country.service';
import { EditorialService } from '../../service/editorial.service';
import { LenguajeService } from '../../service/lenguaje.service';
import { SystemUserService } from '../../service/system-user.service';
import { DocumentService } from '../../service/document.service';
import { match } from 'minimatch';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [
    AuthorService,
    CategoryService,
    CountryService,
    EditorialService,
    LenguajeService,
    SystemUserService,
    DocumentService
  ]
})
export class DocumentComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;

  public documents: Observable<Document>[];
  public titulo: string;
  private authorService: AuthorService;
  private categoryService: CategoryService;
  private countryService: CountryService;
  private editorialService: EditorialService;
  private lenguajeService: LenguajeService;
  private systemUserService: SystemUserService;
  private documentService: DocumentService;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    authorService: AuthorService,
    categoryService: CategoryService,
    countryService: CountryService,
    editorialService: EditorialService,
    lenguajeService: LenguajeService,
    systemUserService: SystemUserService,
    documentService: DocumentService
  ) {
    this.route = route;
    this.router = router;
    this.authorService = authorService;
    this.categoryService = categoryService;
    this.countryService = countryService;
    this.editorialService = editorialService;
    this.lenguajeService = lenguajeService;
    this.systemUserService = systemUserService;
    this.documentService = documentService;
    this.titulo = 'Lista de Libros';
  }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.documentService.getAll().subscribe(
      response => {
        this.documents = response.data;
        if (!this.documents) {
          swal.fire({ title: response.status, text: response.message, type: 'success'});
        }
      }, error => {
        swal.fire({
          title: error.status,
          text: error.message,
          type: 'error',
          confirmButtonText: 'Cerrar'
          });
      }
    );
  }

  editDocument(item: Document) {
    this.router.navigate(['/document/' + item.documentId + '/edit']);
  }

  addDocument() {
    this.router.navigate(['/add-document']);
  }

  delDocument(item: Document) {
    swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de querer borrar el registro?',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#DF013A'
      }).then((confirm) => {

        if (confirm.value) {
          this.documentService.delete(item.documentId).subscribe(Response => {
            this.response = Response;
            console.log(this.response);
            if (this.response.status === 'OK') {
              swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
              this.getDocuments();
            } else {
              swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
            }
          }, error => {
            swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
          });
        }
      });
  }


  getArrayFromNumber(paginas) {
    // tslint:disable-next-line:prefer-const
    let num = Math.ceil(paginas / 5);
    return new Array(num);
  }

  updateIndex(pageIndex) {
      this.startIndex = pageIndex * 5;
      this.endIndex = this.startIndex + 5;
  }

}
