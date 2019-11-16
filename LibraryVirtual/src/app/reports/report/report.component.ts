import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report1 } from 'src/app/model/report1';
import { Report1Service } from 'src/app/service/report1.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;

  public editoriales: Observable<Report1>[];
  public titulo: string;
  private report1Service: Report1Service;
  private response: any;

  startIndex = 0;
  endIndex = 5;
  constructor(
    route: ActivatedRoute,
    router: Router,
    report1Service: Report1Service
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

}
