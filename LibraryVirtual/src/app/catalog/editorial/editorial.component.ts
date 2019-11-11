import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';


import { Editorial } from '../../model/editorial';
import { EditorialService } from '../../service/editorial.service';
import { match } from 'minimatch';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css'],
  providers: [
    EditorialService
  ]
})
export class EditorialComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;

  public editoriales: Observable<Editorial>[];
  public titulo: string;
  private editorialService: EditorialService;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    editorialService: EditorialService
  ) {
    this.route = route;
    this.router = router;
    this.editorialService = editorialService;
    this.titulo = 'Lista de Editoriales';
  }

  ngOnInit() {
    this.getEditoriales();
  }

  getEditoriales() {
    this.editorialService.getAll().subscribe(
      response => {
        this.editoriales = response.data;
        if (!this.editoriales) {
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

  editEditorial(item: Editorial) {
    this.router.navigate(['/editorial/' + item.editorialId + '/edit']);
  }

  addEditorial() {
    this.router.navigate(['/add-editorial']);
  }

  delEditorial(item: Editorial) {
    swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de querer borrar el registro?',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#DF013A'
      }).then((confirm) => {

        if (confirm.value) {
          this.editorialService.delete(item.editorialId).subscribe(Response => {
            this.response = Response;
            console.log(this.response);
            if (this.response.status === 'OK') {
              swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
              this.getEditoriales();
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
