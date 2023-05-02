import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  onDelete(event: any) {
    const id = event as number;
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}
