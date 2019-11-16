import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../model/category';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'category/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'category/ver/' + id);
  }

  add(data: Category) {
    return this.http.post(this.urlBase + 'category/crear', data);
  }

  update(data: Category, id: number) {
    return this.http.put(this.urlBase + 'category/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'category/borrar/' + id);
  }
}
