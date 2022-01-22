import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface User {
  login: string;
  password: string;
  email: string;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  sendCount() {
    return this.http.get(environment.apiUrl + '/count');
  }

  postRegistrationData(user: User) {
    return this.http.post(environment.apiUrl + '/reg', user);
  }

  postAuthData(user: any) {
    return this.http.post(environment.apiUrl + '/auth', user);
  }
}
