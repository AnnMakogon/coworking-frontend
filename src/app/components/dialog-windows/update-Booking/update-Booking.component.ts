import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from 'src/app/dto/Booking';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-update-Booking',
  templateUrl: './update-Booking.component.html',
  styleUrls: ['./update-Booking.component.scss']
})
export class UpdateBookingComponent implements OnInit {

  editingBooking: Booking;
  events: any[] = [];
  selectedDate: Date;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  constructor(public dialogRef: MatDialogRef<UpdateBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Booking,
    private calendarService: CalendarService) {
    this.editingBooking = data;
    this.selectedDate = new Date(data.date)
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadEvents(): void {

    let month = this.selectedDate.getMonth() + 1;
    const year = this.selectedDate.getFullYear();

    if (this.editingBooking && this.editingBooking.table && this.editingBooking.table.id) {
      this.calendarService.getDataToCalendar(this.editingBooking.table.id, month.toString(), year).subscribe(data => {
        this.events = data;
        console.log('Selected Date ' + this.selectedDate);
      });
    }
  }

  changeMonth(direction: number): void {
    const currentYear = this.selectedDate.getFullYear();
    const currentMonth = this.selectedDate.getMonth();

    this.selectedDate = new Date(currentYear, currentMonth + direction, 1);
    this.loadEvents();
  }

  getDaysInMonth(): Date[] {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  }

  isEventDay(day: Date): boolean {
    const formattedDate = day.toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD
    return this.events.some(event => event.date === formattedDate);
  }

  selectDate(day: Date): void {
    if (!this.isEventDay(day)) {
      this.selectedDate = new Date(day); // Обновляем выбранную дату
      this.editingBooking.date = new Date(day); // Обновляем дату в booking
    }
  }

}
