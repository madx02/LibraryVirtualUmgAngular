import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../model/country';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'country/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'country/ver/' + id);
  }

  add(data: Country) {
    return this.http.post(this.urlBase + 'country/crear', data);
  }

  update(data: Country, id: number) {
    return this.http.put(this.urlBase + 'country/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'country/borrar/' + id);
  }
}
