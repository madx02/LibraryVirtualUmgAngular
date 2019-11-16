import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';


import { Document } from '../model/document';
import { DocumentService } from '../service/document.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    DocumentService
  ]
})
export class HomeComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private documentService: DocumentService;
  private rutaImagen: string;

  public documents: Observable<Document>[];
  public titulo: string;
  private response: any;


  public imagenDetalle: string;

  constructor(
    route: ActivatedRoute,
    router: Router,
    documentService: DocumentService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.documentService = documentService;
    this.titulo = 'Libros';
    this.rutaImagen = 'assets/img/';

  }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.documentService.getAll().subscribe(
      response => {
        this.documents = response.data;
        if (!this.documents) {
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
