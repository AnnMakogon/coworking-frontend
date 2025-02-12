import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteBookingComponent } from 'src/app/components/dialog-windows/delete-Booking/delete-Booking.component';
import { UpdateBookingComponent } from 'src/app/components/dialog-windows/update-Booking/update-Booking.component';
import { Booking } from 'src/app/dto/Booking';
import { CredentialUser } from 'src/app/dto/CredentialUser';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-myBookings',
  templateUrl: './myBookings.component.html',
  styleUrls: ['./myBookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  persUser: CredentialUser;

  dataSource = new MatTableDataSource<Booking>;

  displayedColumns: string[] = [ 'name', 'address','date', 'number', 'action'];

  constructor(private router: Router,
    private dialog: MatDialog,
    private bookingService: BookingService
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
    this.bookingService.getWorkspaceToMyBooking(this.persUser.id).subscribe(data => {
      this.dataSource.data = data.content;
    })


  }

  change(booking: Booking){
    const dialogAdapterBooking = this.dialog.open(UpdateBookingComponent, {
      width: '400px',
      data: booking
    });
    dialogAdapterBooking.afterClosed().subscribe((result: Booking) => {
      if (result) {
        this.bookingService.changeBooking(result).subscribe(() => {
          this.updateData();
          console.log("change Booking id: " + result.id);
        });
      } else {
        this.updateData();
      }
    })
  }

  delete(booking: Booking): void{
    const dialogDelTable = this.dialog.open(DeleteBookingComponent, {
      width: '400px'
    });
    dialogDelTable.afterClosed().subscribe((result: Boolean) => {
      if(result && booking.id) {
        this.bookingService.deleteBooking(booking.id).subscribe(() => {
          this.updateData();
          console.log("delete " + booking.date);
        })
      }
    })
  }


}
