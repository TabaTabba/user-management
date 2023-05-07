import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/models/status.model';
import { StatusDetailsComponent } from '../status-details/status-details.component';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent {
  @Input() statuses?: Status[];
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter<Status>();

  status: Status = {};

  displayedColumns: string[] = ['status', 'actions'];
  dataSource = new MatTableDataSource<Status>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statuses']) {
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  initializeDataSource() {
    if (this.statuses) {
      this.dataSource = new MatTableDataSource<Status>(this.statuses);
      this.dataSource.paginator = this.paginator;
      this.paginator.length = this.statuses.length;
    }
  }

  onDelete(id: number) {
    this.deleteEvent.emit(id);
  }

  openDialog(status: Status) {
    const dialogRef = this.dialog.open(StatusDetailsComponent, {
      data: status
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        status.value = result;
        this.editEvent.emit(status); 
      }
    });
  }
}
