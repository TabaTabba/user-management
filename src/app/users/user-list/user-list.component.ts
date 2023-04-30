import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent{
  users: User[] = [{
    email: 'ssabashvili37@gmail.com',
    personalId: '01719091245',
    firstName: 'Saba',
    lastName: 'Sabashvili',
    dateOfBirth: '08/04/2004',
    category: 'user',
    status: 'active'
  }];

  displayedColumns: string[] = ['email', 'personalId', 'firstName', 'lastName', 'dateOfBirth', 'category', 'status'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddUser(){

  }
}