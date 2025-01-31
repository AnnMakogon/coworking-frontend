import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() tableId: number | null = 0;
  events: any[] = [];
  selectedDate: Date = new Date();

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    console.log(`Calendar initialized for tableId: ${this.tableId}`);
    this.loadEvents();
  }

  //запрос на данные
  loadEvents(): void {

    let month = this.selectedDate.getMonth() + 1;
    const year = this.selectedDate.getFullYear();

    if (this.tableId) {
      this.calendarService.getDataToCalendar(this.tableId, month.toString(), year).subscribe(data => {
        this.events = data;
        console.log('Selected Date ' + this.selectedDate);
      });
    }
  }

  //переключать месяц
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
    const formattedDate = day.toISOString().split('T')[0]; //дату в формат YYYY-MM-DD
    return this.events.some(event => event.date === formattedDate);
  }

  getFioCustomer(day: Date): string {
    const formattedDate = day.toISOString().split('T')[0];
    const eventsForDate = this.events.filter(event => event.date === formattedDate);
    return eventsForDate.map(event => event.fioCustomer).join('\n');
  }

}
