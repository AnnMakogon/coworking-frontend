import { Workspace } from '../../../dto/Workspace';
import { MapComponent } from '../map.component';
import { CoordinatService } from '../../../services/coord.service';
import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-editWorkspace',
  templateUrl: './editWorkspace.component.html',
  styleUrls: ['./editWorkspace.component.scss']
})
export class EditWorkspaceComponent implements OnInit, OnChanges {
  workspace: Workspace = new Workspace();
  coordinates: { lat: number | null; lng: number | null; address: string } = { lat: this.workspace.latitude, lng: this.workspace.longitude, address: this.workspace.address };
  private isSubscribed: boolean = false;

  constructor(private route: ActivatedRoute,
    private coordinateService: CoordinatService,
    private router: Router,
    private workspaceService: WorkspaceService,
    private mapComponent: MapComponent,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    sessionStorage.setItem("editW", JSON.stringify(true));
    console.log("EditWorkspaceComponent");
    this.route.paramMap.subscribe(() => {
      this.workspace = history.state as Workspace;
    });
    if (!this.isSubscribed) {
      this.isSubscribed = true;
      this.coordinateService.currentCoordinates.subscribe(coords => {
        this.updateCoordinates(coords);
      });
    }
    this.mapComponent.addressSelected.subscribe(address => {
      this.workspace.address = address;
      console.log("Address from mapComponent: " + address);
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workspace'] && changes['workspace'].currentValue) {
      this.workspace.address = changes['workspace'].currentValue.address;
    }
  }

  private updateCoordinates(coords: { lat: number | null; lng: number | null; address: string }) {
    this.coordinates = coords;
    console.log('Received coordinates:', this.coordinates);
  }

  editCoord() {
    this.workspace.address = this.coordinates.address;
  }

  cancel() {
    this.router.navigate(['map/myWorkspaces']);
    sessionStorage.setItem("editW", JSON.stringify(false));
  }

  editWorkspaceToDB() {
    this.workspace.address = this.coordinates.address;
    this.workspace.latitude = this.coordinates.lat;
    this.workspace.longitude = this.coordinates.lng;
    console.log("Save edit workspace with address: " + this.workspace.address);
    this.workspaceService.editWorkspace(this.workspace).subscribe(() => {
      this.router.navigate(['map/myWorkspaces']);
      sessionStorage.setItem("editW", JSON.stringify(false));
    });
  }

}
