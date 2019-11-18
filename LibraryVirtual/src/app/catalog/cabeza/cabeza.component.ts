import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-cabeza',
  templateUrl: './cabeza.component.html',
  styleUrls: ['./cabeza.component.css'],
  providers: [
    CategoryService
  ]
})
export class CabezaComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  public title: string;
  public categorys: Observable<Category>[];
  private categoryService: CategoryService;
  private storageService: StorageService;

  constructor(
    route: ActivatedRoute,
    router: Router,
    categoryService: CategoryService,
    storageService: StorageService,

    ) {
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.title = 'Libreria Virtual Umg';
    this.storageService = storageService;

   }

  ngOnInit() {
    this.getCategorys();
  }

  logout() {
    this.storageService.logout();
  }


  login() {
    this.router.navigate(['/login']);
  }

  getCategorys() {
    //console.log(this.route);
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

  getLibro(item: Category) {
    this.router.navigate(['/home/' + item.categoryId]);
  }


}
