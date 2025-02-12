import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/dto/Booking';
import { Table } from 'src/app/dto/Table';
import { Workspace } from 'src/app/dto/Workspace';
import { BookingService } from 'src/app/services/booking.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  idWorkspace: number = 0;

  tables: Table[] = [];

  selectedTable: Table | null = null;
  isDaySelected: boolean = false;
  selectedDate: Date = new Date();
  events: any[] = [];
  selectedDay: Date | null = null;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedTableNumber: number | null = null;
  selectedTableDate: Date | null = null;

  constructor(private router: Router,
    private activatedRouting: ActivatedRoute,
    private tableService: TableService,
    private calendarService: CalendarService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.activatedRouting.params.subscribe(params => {
      this.idWorkspace = +params['idWorkspace'];
    });
    if (this.idWorkspace) {
      this.tableService.getTable(this.idWorkspace).subscribe(data => {
        this.tables = data.content;
        this.selectedTable;
      });
    }
  }

  cancel() {
    this.router.navigate(['map/myWorkspaces']);
  }

  selectTable(table: Table) {
    this.selectedTable = table;
    this.selectedTableNumber = table.number;
    this.isDaySelected = false;
    this.loadEvents();
  }

  loadEvents(): void {

    let month = this.selectedDate.getMonth() + 1;
    const year = this.selectedDate.getFullYear();

    if (this.selectedTable?.id) {
      this.calendarService.getDataToCalendar(this.selectedTable.id, month.toString(), year).subscribe(data => {
        this.events = data;
      });
    }
  }

  selectDay(day: Date) {
    if (this.selectedDay && this.selectedDay.getTime() === day.getTime()) {
      this.selectedDay = null;
      this.isDaySelected = false;
    } else {
      this.selectedDay = day;
      this.isDaySelected = true;
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
    const formattedDate = day.toISOString().split('T')[0];
    return this.events.some(event => event.date === formattedDate);
  }

  getFioCustomer(day: Date): string {
    const formattedDate = day.toISOString().split('T')[0];
    const eventsForDate = this.events.filter(event => event.date === formattedDate);
    return eventsForDate.map(event => event.fioCustomer).join(', ');
  }

  goToPayment() {
    console.log('Selected Table Number:', this.selectedTableNumber);
    console.log('Selected Date:', this.selectedDay);
     const userData = sessionStorage.getItem("0");

    if (this.selectedDay && this.selectedTable && userData) {
      const booking = new Booking();
      booking.date = this.selectedDay;
      booking.table = this.selectedTable;

      this.selectedTable.bookings = this.selectedTable.bookings || [];
      this.selectedTable.bookings.push(booking);

      const workspace = new Workspace();
      workspace.id = this.idWorkspace;
      this.selectedTable.workspace = workspace;
      booking.table.workspace = workspace;

      const persUser = JSON.parse(userData);

      //плоская версия, иначе ошибка круговоой сериализации
      const bookingToSend = {
        date: booking.date,
        table: {
          id: booking.table.id,
          number: booking.table.number,
          description: booking.table.description,
          price: booking.table.price,
          workspace: {
            id: booking.table.workspace.id
          }
        },
        customer: {
          credential: {
            id: persUser.id
          }
        }
      };

      this.bookingService.createBooking(bookingToSend).subscribe(() => {
        alert("Successful payment");
        this.router.navigate(['map/myWorkspaces']);
      });
    } else {
      console.error('Selected day or table is not defined.');
    }
  }

}
