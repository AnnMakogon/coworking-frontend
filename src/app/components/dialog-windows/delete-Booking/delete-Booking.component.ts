import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-Booking',
  templateUrl: './delete-Booking.component.html',
  styleUrls: ['./delete-Booking.component.scss']
})
export class DeleteBookingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBookingComponent>) { }

  ngOnInit() {
  }

  noDel(): void {
    this.dialogRef.close(false);
  }

  yesDel(): void {
    this.dialogRef.close(true);
  }

}
