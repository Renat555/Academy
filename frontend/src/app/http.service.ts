import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  sendCount() {
    return this.http.get('http://localhost:3000/count');
  }
}
