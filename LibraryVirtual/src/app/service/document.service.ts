import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Document } from '../model/document';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'document/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'document/ver/' + id);
  }

  getCategory( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'document/category/' + id);
  }

  getBusqueda( cadena: string ): Observable<any> {
    return this.http.get(this.urlBase + 'document/busqueda/' + cadena);
  }

  add(data: Document) {
    return this.http.post(this.urlBase + 'document/crear', data);
  }

  update(data: Document, id: number) {
    return this.http.put(this.urlBase + 'document/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'document/borrar/' + id);
  }
}
