import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report2 } from 'src/app/model/report2';
import { Report2Service } from 'src/app/service/report2.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;

  public editoriales: Observable<Report2>[];
  public titulo: string;
  private report1Service: Report2Service;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    report1Service: Report2Service
  ) {
    this.route = route;
    this.router = router;
    this.report1Service = report1Service;
    this.titulo = 'Lista de Libros por autor';
  }
  ngOnInit() {
    this.getReport1all();
  }

  getReport1all(){
    this.report1Service.getAll().subscribe(
      response => {
        this.editoriales = response.data;
        //console.log(this.editoriales)
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

