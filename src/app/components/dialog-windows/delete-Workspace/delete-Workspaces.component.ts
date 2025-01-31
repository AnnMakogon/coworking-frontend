import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-Workspaces',
  templateUrl: './delete-Workspaces.component.html',
  styleUrls: ['./delete-Workspaces.component.scss']
})
export class DeleteWorkspaceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteWorkspaceComponent>) {
  }

  ngOnInit() {}

  noDel(): void {
    this.dialogRef.close(false);
  }

  yesDel(): void {
    this.dialogRef.close(true);
  }

}
