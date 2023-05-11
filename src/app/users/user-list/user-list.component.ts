import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/users/user.model';
import { Router } from '@angular/router';
import { UserFilter } from 'src/app/models/users/user-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges {
  @Input() users?: User[];
  @Input() usersCount?: number;

  @Output() onDeleteEvent = new EventEmitter();
  @Output() onPaginate = new EventEmitter<any>();

  userFilter: UserFilter = {};

  displayedColumns: string[] = ['email', 'personalId', 'firstName', 'lastName', 'dateOfBirth', 'category', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.initializeDataSource();
    }
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  onEdit(id: number) {
    this.router.navigate(['user-details/' + id]);
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

  onPaginateChange(data: any) {
    this.onPaginate.emit(data);
  }
}

