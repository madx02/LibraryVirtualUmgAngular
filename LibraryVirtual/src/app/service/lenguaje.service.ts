import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lenguaje } from '../model/lenguaje';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class LenguajeService {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'lenguaje/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'lenguaje/ver/' + id);
  }

  add(data: Lenguaje) {
    return this.http.post(this.urlBase + 'lenguaje/crear', data);
  }

  update(data: Lenguaje, id: number) {
    return this.http.put(this.urlBase + 'lenguaje/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'lenguaje/borrar/' + id);
  }
}
