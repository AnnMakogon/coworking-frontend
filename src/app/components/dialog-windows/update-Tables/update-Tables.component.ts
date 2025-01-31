import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableUpdate } from 'src/app/dto/TableUpdate';

@Component({
  selector: 'app-update-Tables',
  templateUrl: './update-Tables.component.html',
  styleUrls: ['./update-Tables.component.scss']
})
export class UpdateTablesComponent implements OnInit {

  editingTable: TableUpdate;

  constructor(public dialogRef: MatDialogRef<UpdateTablesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableUpdate ) {
      this.editingTable = data;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
