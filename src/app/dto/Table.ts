import { Booking } from "./Booking";
import { Workspace } from "./Workspace";

export class Table {
  constructor() {
    this.id = null;
    this.number = null;
    this.description = "";
    this.price = null;
    this.bookings = [];
    this.workspace = new Workspace()
  }

  id: number | null;
  number: number | null;
  description: string;
  price: number | null;
  bookings: Booking[];
  workspace: Workspace;
}
