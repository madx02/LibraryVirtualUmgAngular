import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Author } from '../model/author';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'author/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'author/ver/' + id);
  }

  getPais(): Observable<any> {
    return this.http.get(this.urlBase + 'country/listar');
  }

  add(data: Author) {
    console.log(data);
    return this.http.post(this.urlBase + 'author/crear', data);
  }

  update(data: Author, id: number) {
    return this.http.put(this.urlBase + 'author/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'author/borrar/' + id);
  }

}
