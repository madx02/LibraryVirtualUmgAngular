import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';


import { Author } from '../../model/author';
import { AuthorService } from '../../service/author.service';
import { match } from 'minimatch';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  providers: [
    AuthorService
  ]

})
export class AuthorComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;

  public authors: Observable<Author>[];
  public titulo: string;
  private authorService: AuthorService;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    authorService: AuthorService
  ) {
    this.route = route;
    this.router = router;
    this.authorService = authorService;
    this.titulo = 'Lista de Autores';
  }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
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

  editAuthor(item: Author) {
    this.router.navigate(['/author/' + item.authorId + '/edit']);
  }

  addAuthor() {
    this.router.navigate(['/add-author']);
  }

  delAuthor(item: Author) {
    swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de querer borrar el registro?',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#DF013A'
      }).then((confirm) => {

        if (confirm.value) {
          this.authorService.delete(item.authorId).subscribe(Response => {
            this.response = Response;
            console.log(this.response);
            if (this.response.status === 'OK') {
              swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
              this.getAuthors();
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
