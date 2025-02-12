import { Table } from "./Table";

export class Workspace {
  constructor() {
    this.id = null;
    this.name = "";
    this.description = "";
    this.address = "";
    this.latitude = null;
    this.longitude = null;
    this.tables = [];
  }

  id: number | null;
  name: string;
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  tables: Table[]
}
