import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @Input() tableId: number | null = 0;
  events: any[] = [];
  selectedDate: Date = new Date();

  timeSlots: string[] = [
    '9:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    '18:00 - 21:00'
  ];

  daysOfWeek: string[] = ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sut'];

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    console.log(`WEEK initialized for tableId: ${this.tableId}`);
    this.loadEvents();
  }

  loadEvents(): void {
    const startOfWeek = this.getStartOfWeek(this.selectedDate);
    const endOfWeek = this.getEndOfWeek(this.selectedDate);

    if (this.tableId) {
      this.calendarService.getDataForWeek(this.tableId, startOfWeek, endOfWeek).subscribe((data) => {
        this.events = [];  //ЗАГЛУШКА
      });
    }
  }

  changeWeek(direction: number): void {
    this.selectedDate.setDate(this.selectedDate.getDate() + direction * 7);
    this.loadEvents();
  }

  //главный метод, возвращающий даты дней недели
  getDaysInWeek(): Date[] {
    const startOfWeek = this.getStartOfWeek(this.selectedDate);
    return Array.from({ length: 7 }, (_, i) =>
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
  }

  //начало недели
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  getEndOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() + (6 - day);
    return new Date(date.setDate(diff));
  }

  getFioCustomerWeek(day: Date, timeSlot: string): string {
    const formattedDate = day.toISOString().split('T')[0];
    const eventsForDateAndTime = this.events.filter(event => event.date === formattedDate && event.time === timeSlot);
    return eventsForDateAndTime.map(event => event.fioCustomer).join('\n');
  }

  isEventTimeSlot(day: Date, timeSlot: string): boolean {
    const formattedDate = day.toISOString().split('T')[0];
    return this.events.some(event => event.date === formattedDate && event.time === timeSlot);
  }

  getWeekHeader(): string {
    const days = this.getDaysInWeek();
    const startDate = days[0];
    const endDate = days[days.length - 1];
    return `Week ${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')} - ${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}`;
  }

}
