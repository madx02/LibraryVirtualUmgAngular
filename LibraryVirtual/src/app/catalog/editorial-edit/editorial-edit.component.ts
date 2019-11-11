import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Editorial } from '../../model/editorial';
import { EditorialService } from '../../service/editorial.service';
import { AuthorService } from '../../service/author.service';

@Component({
  selector: 'app-editorial-edit',
  templateUrl: './editorial-edit.component.html',
  styleUrls: ['./editorial-edit.component.css'],
  providers: [
    EditorialService,
    AuthorService
  ]
})
export class EditorialEditComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private isEdit: boolean;

  private editorialService: EditorialService;
  private authorService: AuthorService;

  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;
  paises: Array<any>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    editorialService: EditorialService,
    authorService: AuthorService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.editorialService = editorialService;
    this.authorService = authorService;
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      editorialId: null,
      name: [null, [Validators.required]],
      statusId: 1,
      countryId: [null, [Validators.required]],
      createdUser: 'MK',
    });
    this.getPais();
    this.getEditorial();
  }

  getEditorial() {
    // tslint:disable-next-line:prefer-const no-string-literal
    let editorialId = this.route.snapshot.params['editorialId'];
    if (editorialId !== undefined) {
      this.isEdit = true;
      this.editorialService.get(editorialId).subscribe(
        Response => {
          this.response = Response;
          // tslint:disable-next-line:align
          if (this.response.status === 'OK') {
            // tslint:disable-next-line:prefer-const
            let editorial = this.response.data[0];
            this.generalForm.get('editorialId').setValue(editorial.editorialId);
            this.generalForm.get('name').setValue(editorial.name);
            this.generalForm.get('countryId').setValue(editorial.countryId);
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
    let data: Editorial = this.generalForm.value;
    if (this.isEdit) {
      this.update(data);
    } else {
      this.create(data);
    }
  }


  cancel() {
    this.router.navigate(['/editorial']);
  }

  update(data) {
    console.log(data);
    this.editorialService.update(data, data.editorialId).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/editorial']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  create(data) {
    this.editorialService.add(data).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/editorial']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  getPais() {
    this.authorService.getPais().subscribe(
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
