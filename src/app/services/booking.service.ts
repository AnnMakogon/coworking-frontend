import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../dto/Booking';
import { Page } from '../dto/Page';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
   const token = this.getToken();
   return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  bookingTable(id: number): Observable<Page<Booking>>{
    const currentDate = new Date();
    const formatedDate = currentDate.toISOString().split('T')[0];
    const params = new HttpParams().set('date', formatedDate);

    return this.http.get<Page<Booking>>("api/bookingTable/" + id, {
      headers: this.getAuthHeaders(),
      params: params
    }).pipe();
  }

}
