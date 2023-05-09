import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categories/category.model';
import { StatusService } from '../services/status.service';
import { Status } from '../models/statuses/status.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  filteredUsers: User[] = [];
  categories: Category[] = [];
  statuses: Status[] = [];

  constructor(private userService: UserService, private categoryService: CategoryService, private statusService: StatusService) { }

  ngOnInit(): void {
   this.getUsers();
   this.getCategories();
   this.getStatuses();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.filteredUsers = users.reverse();
      console.log(this.filteredUsers);
    })
  }

  deleteUser(event: any) {
    const id = event as number;
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  
  getStatuses(){
    this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

  filterUsers(filterValues: any) {
    this.userService.filterUsers(filterValues).subscribe((users) => {
      this.filteredUsers = users;
    });
  }
}