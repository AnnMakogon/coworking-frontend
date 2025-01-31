import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteTablesComponent } from 'src/app/components/dialog-windows/delete-Tables/delete-Tables.component';
import { UpdateTablesComponent } from 'src/app/components/dialog-windows/update-Tables/update-Tables.component';
import { Table } from 'src/app/dto/Table';
import { TableUpdate } from 'src/app/dto/TableUpdate';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  id: number | null;
  tables: Table[] = [];

  dataSource = new MatTableDataSource<Table>;
  visibleBookings: Set<number> = new Set();

  events: any[] = [];
  selectedDate: Date = new Date();

  displayedColumns: string[] = ['id', 'namber', 'description', 'price', 'action'];

  constructor(private tableService: TableService,
    private router: Router,
    private activateRouting: ActivatedRoute,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.id = null;
  }

  ngOnInit() {
    this.activateRouting.params.subscribe(params => {
      this.id = +params['id'];
    });
    console.log("id workspace = " + this.id);
    this.updateData();
  }

  updateData() {
    if (this.id) {
      this.tableService.getTable(this.id).subscribe(data => {
        this.dataSource.data = data.content;
        this.tables = this.dataSource.data;
      });
    }
  }

  cancel(): void {
    this.router.navigate(["map/myWorkspaces"]);
  }

  changeTable(table: Table): void {
    const dialogApdateTable = this.dialog.open(UpdateTablesComponent, {
      width: '400px',
      data: table
    });
    dialogApdateTable.afterClosed().subscribe((result: TableUpdate) => {
      if (result && table.id) {
        result.id = table.id;
        this.tableService.changeTable(result).subscribe(() => {
          this.updateData();
          console.log("changeTable " + table.number);
        });
      } else {
        this.updateData();
      }

    })
  }

  deleteTable(table: Table): void {
    const dialogDelTable = this.dialog.open(DeleteTablesComponent, {
      width: '400px',
      data: table
    });
    dialogDelTable.afterClosed().subscribe((result: Boolean) => {
      if (result && table.id) {
        this.tableService.deleteTable(table.id).subscribe(() => {
          this.updateData();
          console.log("delete " + table.number);
        })
      }
    })
  }

  toggleBookings(tableId: number | null): void {
    console.log("Toggling bookings for tableId:", tableId);
    if (tableId) {
      if (this.visibleBookings.has(tableId)) {
        this.visibleBookings.delete(tableId);
      } else {
        this.visibleBookings.add(tableId);
      }
    }
  }

  isBookingsVisible(tableId: number | null): boolean {
    return tableId ? this.visibleBookings.has(tableId) : false;
  }

}
