import { Table } from "./Table";

export class WorkspaceCreate {
  constructor() {
    this.id = null;
    this.name = "";
    this.description = "";
    this.address = "";
    this.latitude = null;
    this.longitude = null;
    this.tables = [];
    this.credentialId = null;
  }

  id: number | null;
  name: string;
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  tables: Table[]
  credentialId: number | null;
}
