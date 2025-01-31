import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../dto/Page';
import { Table } from '../dto/Table';
import { TableUpdate } from '../dto/TableUpdate';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
   const token = this.getToken();
   return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  getTable(id: number): Observable<Page<Table>>{
    return this.http.get<Page<Table>>("api/table/" + id, {
      headers: this.getAuthHeaders()
    }).pipe();
  }

  changeTable(table: TableUpdate): Observable<void> {
    return this.http.put<void>("api/table", table, {
      headers: this.getAuthHeaders()
    }).pipe();
  }

  deleteTable(id: number): Observable<void> {
    return this.http.delete<void>("api/table/" + id, {
      headers: this.getAuthHeaders()
    }).pipe();
  }

}
