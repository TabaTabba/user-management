import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges{
  @Input() users?: User[];
  @Output() onDeleteEvent = new EventEmitter();
  displayedColumns: string[] = ['email', 'personalId', 'firstName', 'lastName', 'dateOfBirth', 'category', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private router: Router) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['users']) {
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initializeDataSource() {
    console.log(this.users, this.paginator);
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
  }

  onEdit(id: number) {
    this.router.navigate(['user-details/' + id]);
  }

  onDelete(id: number) {
    this.onDeleteEvent.emit(id);
  }
}