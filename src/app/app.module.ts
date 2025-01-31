import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatIconModule as matIconModule } from '@angular/material/icon';
import { MyWorkspacesComponent } from './components/map/my-workspaces/my-workspaces.component';
import { TablesComponent } from './components/map/my-workspaces/tables/tables.component';
import { EditWorkspaceComponent } from './components/map/editWorkspace/editWorkspace.component';
import { CalendarComponent } from './components/map/my-workspaces/tables/calendar/calendar.component';
import { UpdateTablesComponent } from './components/dialog-windows/update-Tables/update-Tables.component';
import { WeekComponent } from './components/map/my-workspaces/tables/calendar/week/week.component';
import { CreateWorkspaceMapComponent } from './components/create-workspace-map/create-workspace-map.component';
import { CreateWorkspaceComponent } from './components/create-workspace-map/create-workspace/create-workspace.component';
import { DeleteWorkspaceComponent } from './components/dialog-windows/delete-Workspace/delete-Workspaces.component';
import { ErrorInterceptorService } from './components/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    MyWorkspacesComponent,
    TablesComponent,
    EditWorkspaceComponent,
    CalendarComponent,
    UpdateTablesComponent,
    WeekComponent,
    CreateWorkspaceMapComponent,
    CreateWorkspaceComponent,
    DeleteWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    matIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [RouterModule, ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
