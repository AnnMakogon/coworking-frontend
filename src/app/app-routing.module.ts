import { CreateWorkspaceMapComponent } from './components/create-workspace-map/create-workspace-map.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { MyWorkspacesComponent } from './components/map/my-workspaces/my-workspaces.component';
import { TablesComponent } from './components/map/my-workspaces/tables/tables.component';
import { EditWorkspaceComponent } from './components/map/editWorkspace/editWorkspace.component';
import { CreateWorkspaceComponent } from './components/create-workspace-map/create-workspace/create-workspace.component';
import { WorkspaceDetailsComponent } from './components/map/workspace-details/workspace-details.component';
import { BookingComponent } from './components/map/workspace-details/booking/booking.component';
import { MyBookingsComponent } from './components/map/myBookingsMap/myBookings/myBookings.component';
import { MyBookingsMapComponent } from './components/map/myBookingsMap/myBookingsMap.component';

const routes: Routes = [
  {
    path: 'map', component: MapComponent, children: [
      { path: 'myWorkspaces', component: MyWorkspacesComponent },
      { path: 'edit', component: EditWorkspaceComponent },
      { path: '', redirectTo: 'myWorkspaces', pathMatch: 'full' },
      { path: 'details/:idWorkspace', component: WorkspaceDetailsComponent },
    ]
  },
  {
    path: 'myBookingsMap', component: MyBookingsMapComponent, children: [
      { path: 'myBookings', component: MyBookingsComponent },
      { path: '', redirectTo: 'myBookings', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tables/:id', component: TablesComponent },
  { path: 'book/:idWorkspace', component: BookingComponent },

  { path: 'createWorkspaceMap', component: CreateWorkspaceMapComponent },
  { path: 'createWorkspace/:address/:lat/:lng', component: CreateWorkspaceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart', event.url);
      }
    });
  }
}
