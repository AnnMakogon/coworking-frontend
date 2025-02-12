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

  bookingTable(id: number): Observable<Page<Booking>> {
    const currentDate = new Date();
    const formatedDate = currentDate.toISOString().split('T')[0];
    const params = new HttpParams().set('date', formatedDate);

    return this.http.get<Page<Booking>>("api/bookingTable/" + id, {
      headers: this.getAuthHeaders(),
      params: params
    }).pipe();
  }

  createBooking(booking: any): Observable<void> {
    return this.http.post<void>("api/booking", booking, {
      headers: this.getAuthHeaders()
    }).pipe();
  }

  getWorkspaceToMyBooking(id: number): Observable<Page<Booking>> {
    return this.http.get<Page<Booking>>("/api/workspaceToMyBooking/" + id, {
      headers: this.getAuthHeaders(),
    }).pipe();
  }

  changeBooking(booking: Booking): Observable<void> {
    return this.http.put<void>("/api/bookingUpdateDate/" + booking.id, this.formatDate(booking.date), {
      headers: this.getAuthHeaders(),
    }).pipe();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>("api/booking/" + id, {
      headers: this.getAuthHeaders()
    }).pipe();
  }

}
