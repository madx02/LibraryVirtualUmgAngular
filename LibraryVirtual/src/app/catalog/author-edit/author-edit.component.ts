import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Author } from '../../model/author';
import { AuthorService } from '../../service/author.service';
import { CountryService } from '../../service/country.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css'],
  providers: [
    AuthorService,
    CountryService
  ]
})
export class AuthorEditComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  private isEdit: boolean;

  private authorService: AuthorService;
  private countryService: CountryService;

  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;
  paises: Array<any>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    authorService: AuthorService,
    countryService: CountryService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.authorService = authorService;
    this.countryService = countryService;
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      authorId: null,
      name: [null, [Validators.required]],
      statusId: 1,
      countryId: [null, [Validators.required]],
      createdUser: 'MK',
    });
    this.getPais();
    this.getAuthor();
  }

  getAuthor() {
    // tslint:disable-next-line:prefer-const no-string-literal
    let authorId = this.route.snapshot.params['authorId'];
    if (authorId !== undefined) {
      this.isEdit = true;
      this.authorService.get(authorId).subscribe(
        Response => {
          this.response = Response;
          // tslint:disable-next-line:align
          if (this.response.status === 'OK') {
            // tslint:disable-next-line:prefer-const
            let author = this.response.data[0];
            this.generalForm.get('authorId').setValue(author.authorId);
            this.generalForm.get('name').setValue(author.name);
            this.generalForm.get('countryId').setValue(author.countryId);
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
    let data: Author = this.generalForm.value;
    if (this.isEdit) {
      this.update(data);
    } else {
      this.create(data);
    }
  }


  cancel() {
    this.router.navigate(['/author']);
  }

  update(data) {
    this.authorService.update(data, data.authorId).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/author']);
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
          this.router.navigate(['/author']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  getPais() {
    this.countryService.getAll().subscribe(
      response => {
        this.paises = response.data;
        if (!this.paises) {
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

  changeSelectedPais(event: any) {
    console.log(event);
    console.log(this.generalForm.value.countryId);
  }
}
