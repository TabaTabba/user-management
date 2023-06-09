import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/models/statuses/status.model';
import { StatusDetailsComponent } from '../status-details/status-details.component';
import { StatusFilter } from 'src/app/models/statuses/status-filter.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnChanges {
  @Input() pageIndex?: number;;
  @Input() statuses?: Status[];
  @Input() statusesCount?: number;

  @Output() onDeleteEvent = new EventEmitter<number>();
  @Output() onEditEvent = new EventEmitter<Status>();
  @Output() onPaginate = new EventEmitter<any>();

  statusFilter: StatusFilter = {};

  status: Status = {};

  displayedColumns: string[] = ['status', 'actions'];
  dataSource = new MatTableDataSource<Status>();

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statuses']) {
      this.initializeDataSource();
    }
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<Status>(this.statuses);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.onDeleteEvent.emit(id);
      }
    });
  }

  openDialog(status: Status) {
    const dialogRef = this.dialog.open(StatusDetailsComponent, {
      data: status
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        status.value = result;
        this.onEditEvent.emit(status);
      }
    });
  }

  onPaginateChange(data: any) {
    this.onPaginate.emit(data);
  }
}
