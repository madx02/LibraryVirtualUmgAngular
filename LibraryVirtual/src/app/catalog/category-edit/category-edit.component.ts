import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [
    CategoryService
  ]
})
export class CategoryEditComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private isEdit: boolean;

  private categoryService: CategoryService;

  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;

  constructor(
    route: ActivatedRoute,
    router: Router,
    categoryService: CategoryService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      categoryId: null,
      name: [null, [Validators.required]],
      statusId: 1,
      createdUser: 'MK',
    });
    this.getCategory();
  }

  getCategory() {
    // tslint:disable-next-line:prefer-const no-string-literal
    let categoryId = this.route.snapshot.params['categoryId'];
    if (categoryId !== undefined) {
      this.isEdit = true;
      this.categoryService.get(categoryId).subscribe(
        Response => {
          this.response = Response;
          // tslint:disable-next-line:align
          if (this.response.status === 'OK') {
            // tslint:disable-next-line:prefer-const
            let category = this.response.data[0];
            this.generalForm.get('categoryId').setValue(category.categoryId);
            this.generalForm.get('name').setValue(category.name);
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
    let data: Category = this.generalForm.value;
    if (this.isEdit) {
      this.update(data);
    } else {
      this.create(data);
    }
  }


  cancel() {
    this.router.navigate(['/category']);
  }

  update(data) {
    this.categoryService.update(data, data.categoryId).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/category']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

  create(data) {
    this.categoryService.add(data).subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'OK') {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'success', confirmButtonText: 'Aceptar' });
          this.router.navigate(['/category']);
        } else {
          swal.fire({ title: this.response.status, text: this.response.message, type: 'info', confirmButtonText: 'Aceptar' });
        }
      },
      error => {
        swal.fire({ title: this.response.status, text: this.response.message, type: 'error', confirmButtonText: 'Cerrar' });
      });
  }

}
