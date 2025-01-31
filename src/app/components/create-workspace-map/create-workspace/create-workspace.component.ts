import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialUser } from 'src/app/dto/CredentialUser';
import { Table } from 'src/app/dto/Table';
import { Workspace } from 'src/app/dto/Workspace';
import { WorkspaceCreate } from 'src/app/dto/WorkspaceCreate';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent implements OnInit {

  persUser: CredentialUser;

  address: string ="";
  coordinates: { lat: number; lng: number; } = {lat: 0, lng: 0};

  name: string = "";
  description: string = "";
  photo: string = "";

  tables: Table[] = [{id: null, number: 1, description: '', price: 0 }];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService
  ) {
    this.persUser = new CredentialUser();
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.address = params['address'];
      this.coordinates = {
        lat: +params['lat'],
        lng: +params['lng']
      };
      console.log("address: " + this.address + "\n coords: " + this.coordinates.lat + " : " + this.coordinates.lng);
    })
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    console.log(this.persUser.id);
  }

  cancel(){
    this.router.navigate(['createWorkspaceMap']);
  }

  addWorkspace(){
    console.log(this.tables);
    const newWorkspace: WorkspaceCreate = {id: null, name: this.name, description: this.description, address: this.address,
      latitude: this.coordinates.lat, longitude: this.coordinates.lng,
      tables: this.tables, credentialId: this.persUser.id}
      debugger;
    this.workspaceService.addWorkspace(newWorkspace).subscribe(() =>{
      console.log("succesful Save workspace " + newWorkspace.name);
      this.router.navigate(['map/myWorkspaces']);
    });
  }

  addTable(){
    if (this.tables.length < 10){
      const newTable: Table = {id: null, number: this.tables.length + 1, description: '', price: 0};
      this.tables.push(newTable);
    }
  }

  removeTable() {
    if (this.tables.length > 1) {
      this.tables.pop();
    }
  }

}
