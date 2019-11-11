import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Editorial } from '../model/editorial';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'editorial/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'editorial/ver/' + id);
  }

  getPais(): Observable<any> {
    return this.http.get(this.urlBase + 'country/listar');
  }

  add(data: Editorial) {
    return this.http.post(this.urlBase + 'editorial/crear', data);
  }

  update(data: Editorial, id: number) {
    return this.http.put(this.urlBase + 'editorial/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'editorial/borrar/' + id);
  }
}
