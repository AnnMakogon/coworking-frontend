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

  private token: string | null = null;

  constructor(private http: HttpClient) {}

  loginCredential(email: string, password: string): Observable<any> {
    const body = {
      username: email,
      password: password
    };

    return this.http.post<any>(`/api/login`, body)
    /*.pipe(
      tap((response: { token: string; }) => {
        localStorage.setItem('jwt', response.token);
      })
    )*/
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  // Метод для добавления токена в заголовки
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  // Пример метода для получения защищенного ресурса
  getProtectedResource(): Observable<any> {
    /*return this.http.get('/api/hello', {
      headers: this.getAuthHeaders()
    });*/
    return this.http.get('/api/workspace', {
      headers: this.getAuthHeaders()
    });
  }

  /*loginCredential(credential: CredentialLogin): Observable<CredentialLogin> {
    const loginUrl = '/login';
    const np: string = credential.email + ":" + credential.password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)
    });

    console.log('auth this credential');
    return this.http.post<CredentialLogin>(loginUrl, null, { headers }).pipe();
  }*/

  logout(): Observable<HttpResponse<Array<Object>[]>> {
    const logoutUrl = 'api/logout';
    return this.http.post<HttpResponse<Array<Object>[]>>(logoutUrl, httpOptions);
  }

}
