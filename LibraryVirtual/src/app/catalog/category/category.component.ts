import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';


import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { match } from 'minimatch';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [
    CategoryService
  ]
})
export class CategoryComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;

  public categorys: Observable<Category>[];
  public titulo: string;
  private categoryService: CategoryService;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    categoryService: CategoryService
  ) {
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.titulo = 'Lista de Categorias';
  }

  ngOnInit() {
    this.getCategorys();
  }

  getCategorys() {
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

  editCategory(item: Category) {
    this.router.navigate(['/category/' + item.categoryId + '/edit']);
  }

  addCategory() {
    this.router.navigate(['/add-category']);
  }

  delCategory(item: Category) {
    swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de querer borrar el registro?',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#DF013A'
      }).then((confirm) => {

        if (confirm.value) {
          this.categoryService.delete(item.categoryId).subscribe(Response => {
            this.response = Response;
            console.log(this.response);
            if (this.response.status === 'OK') {
              swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
              this.getCategorys();
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
