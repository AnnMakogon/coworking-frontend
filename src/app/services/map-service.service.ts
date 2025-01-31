import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  getProtectedResource(): Observable<any> {
    return this.http.get('/api/workspace', {
      headers: this.getAuthHeaders()
    }).pipe();
  }

}
