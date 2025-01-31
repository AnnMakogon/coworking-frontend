import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  getDataToCalendar(tableId: number, month: string, year: number): Observable<any[]> {
    return this.http.get<any[]>("api/bookingToCalendar/" + tableId + "/" + month + "/" + year , {
      headers: this.getAuthHeaders()
    }).pipe();
  }

  getDataForWeek(tableId: number, startDate: Date, endDate: Date): Observable<void> {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    /*return this.http.get<any[]>("api/bookingToCalendar/" + tableId + "/" + month + "/" + year , {
      headers: this.getAuthHeaders()
    }).pipe();*/
    return new Observable<void>;
    // ЗАГЛУШКА ТК В БД ЕЩЕ НЕТ ВРЕМЕНИ
  }

}
