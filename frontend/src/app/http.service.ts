import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  sendCount() {
    return this.http.get(environment.apiUrl + '/count');
  }
}
