import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class Report2Service {

  private urlBase: string;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.urlBase = Config.apiUrl;
   }

  getAll(): Observable<any> {
    return this.http.get(this.urlBase + 'document/category');
  }



}
