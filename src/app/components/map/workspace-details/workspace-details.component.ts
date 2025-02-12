import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Workspace } from './../../../dto/Workspace';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.component.html',
  styleUrls: ['./workspace-details.component.scss']
})
export class WorkspaceDetailsComponent implements OnInit {

  workspace: Workspace = new Workspace();

  idWorkspace: number = 0;

  constructor(private workspaceService: WorkspaceService,
    private activatedRouting: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRouting.params.subscribe(params => {
      this.idWorkspace = +params['idWorkspace'];
    });
    this.workspaceService.getDetails(this.idWorkspace).subscribe(data => {
      this.workspace = data;
    })

  }

  book() {
    console.log("book of the table in workspace with id: " + this.idWorkspace);
    this.router.navigate(['book', this.idWorkspace]);
  }

  cancel() {
    this.router.navigate(['map/myWorkspaces']);
  }


}
