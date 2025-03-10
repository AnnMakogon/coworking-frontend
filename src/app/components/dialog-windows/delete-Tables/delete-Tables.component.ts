import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-Tables',
  templateUrl: './delete-Tables.component.html',
  styleUrls: ['./delete-Tables.component.scss']
})
export class DeleteTablesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTablesComponent>) {
  }

  ngOnInit() { }

  noDel(): void {
    this.dialogRef.close(false);
  }

  yesDel(): void {
    this.dialogRef.close(true);
  }

}
