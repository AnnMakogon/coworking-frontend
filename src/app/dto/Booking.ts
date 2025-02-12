import { Table } from "./Table";

export class Booking {
  constructor() {
    this.id = null;
    this.date = new Date();
    this.table = null;
  }

  id: number | null;
  date: Date;
  table: Table | null;
}
