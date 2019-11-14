import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
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
export class DocumentEditComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private isEdit: boolean;

  private authorService: AuthorService;
  private categoryService: CategoryService;
  private countryService: CountryService;
  private editorialService: EditorialService;
  private lenguajeService: LenguajeService;
  private systemUserService: SystemUserService;
  private documentService: DocumentService;

  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;
  authors: Array<Author>;
  categorys: Array<Category>;
  editorials: Array<Editorial>;
  lenguajes: Array<Lenguaje>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    authorService: AuthorService,
    categoryService: CategoryService,
    countryService: CountryService,
    editorialService: EditorialService,
    lenguajeService: LenguajeService,
    systemUserService: SystemUserService,
    documentService: DocumentService,
    formBuilder: FormBuilder
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
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      documentId: null,
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imagenPath:  [null, [Validators.required]],
      pdfPath:  [null, [Validators.required]],
      privated: 0,
      userId: 1,
      categoryId: [null, [Validators.required]],
      authorId: [null, [Validators.required]],
      editorialId: [null, [Validators.required]],
      lenguajeId: [null, [Validators.required]],
      state: 1,
      publicationDate: Date.now(),
      createdUser: 'MK',
    });
    this.getAuthor();
    this.getCategory();
    this.getLenguaje();
    this.getEditorial();
    this.getDocument();
  }

  getDocument() {
    // tslint:disable-next-line:prefer-const no-string-literal
    let documentId = this.route.snapshot.params['documentId'];
    if (documentId !== undefined) {
      this.isEdit = true;
      this.documentService.get(documentId).subscribe(
        Response => {
          this.response = Response;
          // tslint:disable-next-line:align
          if (this.response.status === 'OK') {
            // tslint:disable-next-line:prefer-const
            let document = this.response.data[0];
            this.generalForm.get('documentId').setValue(document.documentId);
            this.generalForm.get('title').setValue(document.title);
            this.generalForm.get('description').setValue(document.description);
            this.generalForm.get('imagenPath').setValue(document.imagenPath);
            this.generalForm.get('pdfPath').setValue(document.pdfPath);
            this.generalForm.get('categoryId').setValue(document.categoryId);
            this.generalForm.get('authorId').setValue(document.authorId);
            this.generalForm.get('editorialId').setValue(document.editorialId);
            this.generalForm.get('lenguajeId').setValue(document.lenguajeId);
          } else {
            swal.fire({ title: Response.status, text: Response.message, type: 'error', confirmButtonText: 'Cerrar' });
          }
        },
        error => {
          swal.fire({ title: error.status, text: error.message, type: 'error', confirmButtonText: 'Cerrar' });
        });
    }
  }

  onSubmit() {
    if (this.generalForm.invalid) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let data: Document = this.generalForm.value;
    if (this.isEdit) {
      this.update(data);
    } else {
      this.create(data);
    }
  }


  cancel() {
    this.router.navigate(['/document']);
  }

  update(data) {
    this.authorService.update(data, data.authorId).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/document']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  create(data) {
    this.authorService.add(data).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/document']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  getAuthor() {
    this.authorService.getAll().subscribe(
      response => {
        this.authors = response.data;
        if (!this.authors) {
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

  getCategory() {
    this.categoryService.getAll().subscribe(
      response => {
        this.categorys = response.data;
        if (!this.categorys) {
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

  getLenguaje() {
    this.lenguajeService.getAll().subscribe(
      response => {
        this.lenguajes = response.data;
        if (!this.lenguajes) {
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

  getEditorial() {
    this.editorialService.getAll().subscribe(
      response => {
        this.editorials = response.data;
        if (!this.editorials) {
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

  changeSelectedCategory(event: any) {
    console.log(event);
    console.log(this.generalForm.value.categoryId);
  }

  changeSelectedEditorial(event: any) {
    console.log(event);
    console.log(this.generalForm.value.editorialId);
  }

  changeSelectedAuthor(event: any) {
    console.log(event);
    console.log(this.generalForm.value.authorlId);
  }

  changeSelectedLenguage(event: any) {
    console.log(event);
    console.log(this.generalForm.value.lenguajeId);
  }
}
