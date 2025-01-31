import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  loginCredential(email: string, password: string): Observable<any> {
    const body = {
      username: email,
      password: password
    };

    return this.http.post<any>(`/api/login`, body).pipe();
  }

  logout(): Observable<HttpResponse<Array<Object>[]>> {
    const logoutUrl = 'api/logout';
    return this.http.post<HttpResponse<Array<Object>[]>>(logoutUrl, httpOptions).pipe();
  }

}
