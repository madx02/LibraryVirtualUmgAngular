import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Category } from './model/category';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CategoryService
  ]
})
export class AppComponent  implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  private userval: boolean;
  public categorys: Observable<Category>[];
  private categoryService: CategoryService;
  public title: string;

  constructor(
    route: ActivatedRoute,
    router: Router,
    categoryService: CategoryService
  ) {
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.title = 'Libreria Virtual Umg';
    this.userval = false;

//    this.url = route._futureSnapshot.routeConfig.path;


  }

  ngOnInit(): void {
    this.getCategorys();
  }



  getCategorys() {
    console.log(this.route)
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
    console.log(item);
  }
}
