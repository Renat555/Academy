import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface User {
  login: string;
  password: string;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getIsAuth() {
    return this.http.get(environment.apiUrl);
  }

  getIntuitionResults(login: string) {
    return this.http.post(environment.apiUrl + '/getResult', { login: login });
  }

  postIntuitionResult(result: {
    mode: string;
    login: string;
    right: number;
    wrong: number;
  }) {
    return this.http.post(environment.apiUrl + '/saveIntuitionTest', result);
  }

  postRegistrationData(user: User) {
    return this.http.post(environment.apiUrl + '/reg', user);
  }

  postAuthData(user: any) {
    return this.http.post(environment.apiUrl + '/auth', user);
  }
}
