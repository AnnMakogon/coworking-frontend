import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../dto/Workspace';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '../dto/Page';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  getWorkspaces(id: number): Observable<Page<Workspace>> {
    return this.http.get<Page<Workspace>>("api/workspaceManager/" + id.toString(), {
      headers: this.getAuthHeaders()
    }).pipe();
  }

  editWorkspace(workspase: Workspace): Observable<void> {
    console.log("edit this " + workspase.name + " workspace");
    return this.http.put<void>("api/workspace", workspase, {
      headers:
        this.getAuthHeaders().set('Content-Type', 'application/json')
    }).pipe();
  }

  addWorkspace(newWorkspace: Workspace): Observable<void>{
    console.log("create new Workspace " + newWorkspace.name)
    return this.http.post<void>("api/newworkspace", newWorkspace, {
      headers:
        this.getAuthHeaders().set('Content-Type', 'application/json')
    }).pipe();
  }

  deleteWorkspace(id: number): Observable<void>{
    return this.http.delete<void>("api/workspace/" + id, {
      headers:
      this.getAuthHeaders().set('Content-Type', 'application/json')
  }).pipe();
  }

}
