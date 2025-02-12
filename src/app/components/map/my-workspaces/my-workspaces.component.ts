import { CredentialUser } from 'src/app/dto/CredentialUser';
import { WorkspaceService } from '../../../services/workspace.service';
import { Workspace } from '../../../dto/Workspace';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteWorkspaceComponent } from '../../dialog-windows/delete-Workspace/delete-Workspaces.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-workspaces',
  templateUrl: './my-workspaces.component.html',
  styleUrls: ['./my-workspaces.component.scss']
})
export class MyWorkspacesComponent implements OnInit {

  persUser: CredentialUser;

  dataSource = new MatTableDataSource<Workspace>;

  displayedColumns: string[] = ['id', 'name', 'address', 'action'];

  constructor(private workspaceService: WorkspaceService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.persUser = new CredentialUser();
  }

  ngOnInit() {
    console.log("Workspace Table");
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    this.updateData();
  }

  updateData() {
    if (this.persUser.id && this.persUser.role == "MANAGER") {
      this.workspaceService.getWorkspacesManager(this.persUser.id).subscribe(data => {
        console.log(data.content);
        this.dataSource.data = data.content;
      });
    } else {
      if (this.persUser.id) {
        this.workspaceService.getWorkspacesCustomer().subscribe(data => {
          console.log(data.content);
          this.dataSource.data = data.content;
        })
      }
    }
  }

  changeW(workspace: Workspace): void {
    console.log("changeW " + workspace.name);
    sessionStorage.setItem("idEditWorkspace", JSON.stringify(workspace.id));
    this.router.navigate(['map/edit'], { state: workspace });
  }

  deleteWorkspace(workspace: Workspace): void {  //todo не сделано, пока только заглушка, тк и так мало их, сделать в последнюю очередь
    const dialogDelWorkspace = this.dialog.open(DeleteWorkspaceComponent, {
      width: '400px',
      data: workspace
    });
    dialogDelWorkspace.afterClosed().subscribe((result: Boolean) => {
      if (result && workspace.id) {
        debugger;
        this.workspaceService.deleteWorkspace(workspace.id).subscribe(() => {
          console.log("succesful delete " + workspace.name);
          this.updateData();
        })
      }
    })

    console.log("deleteW " + workspace.name);
  }

  getConcreteTables(id: number): void {
    this.router.navigate(["tables", id]);
  }

  //для Customer
  selectTable(idWorkspace: number, ) {
    console.log("select Workspace with id: " + idWorkspace);
    this.router.navigate(["map/details", idWorkspace]);
  }

}
