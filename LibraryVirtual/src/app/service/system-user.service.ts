import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SystemUser } from '../model/system-user';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'systemUser/listar');
  }

  get( id: number ): Observable<any> {
    return this.http.get(this.urlBase + 'systemUser/ver/' + id);
  }

  add(data: SystemUser) {
    return this.http.post(this.urlBase + 'systemUser/crear', data);
  }

  update(data: SystemUser, id: number) {
    return this.http.put(this.urlBase + 'systemUser/editar/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.urlBase + 'systemUser/borrar/' + id);
  }
}
