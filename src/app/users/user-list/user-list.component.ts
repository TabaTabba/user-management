import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() users?: User[];
  @Output() deleteEvent = new EventEmitter();
  displayedColumns: string[] = ['email', 'personalId', 'firstName', 'lastName', 'dateOfBirth', 'category', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initializeDataSource() {
    if (this.users) {
      this.dataSource = new MatTableDataSource<User>(this.users);
    }
  }

  onEdit(id: number) {
    this.router.navigate(['user-details/' + id]);
  }

  onDelete(id: number) {
    this.deleteEvent.emit(id);
  }
}