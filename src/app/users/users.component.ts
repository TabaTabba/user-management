import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/users/user.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categories/category.model';
import { StatusService } from '../services/status.service';
import { Status } from '../models/statuses/status.model';
import { UserFilter } from '../models/users/user-filter.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersCount?: number;
  users: User[] = [];
  categories: Category[] = [];
  statuses: Status[] = [];

  userFilter: UserFilter = {
    _page: 0,
    _limit: 10,
    email: '',
    personalId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    category: '',
    status: ''
  }

  constructor(private userService: UserService, private categoryService: CategoryService, private statusService: StatusService) { }

  ngOnInit(): void {
    this.getUsers(this.userFilter);
    this.getCategories();
    this.getStatuses();
  }

  getUsers(userFilter: UserFilter) {
    this.userService.getUsersWithCount(userFilter).subscribe((users) => {
      this.users = users.data || [];
      this.usersCount = users.count;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers(this.userFilter);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

  filterUsers(userFilter: UserFilter) {
    this.userFilter._page = 0;
    this.userFilter.email = userFilter.email;
    this.userFilter.personalId = userFilter.personalId;
    this.userFilter.firstName = userFilter.firstName;
    this.userFilter.lastName = userFilter.lastName;
    this.userFilter.dateOfBirth = userFilter.dateOfBirth;
    this.userFilter.category = userFilter.category;
    this.userFilter.status = userFilter.status;
    this.getUsers(this.userFilter);
  }

  paginate(paginatorData: any){
    this.userFilter._page = paginatorData.pageIndex + 1;
    this.userFilter._limit = paginatorData.pageSize;
    this.getUsers(this.userFilter);
  }
}