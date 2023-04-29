import { Component } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [{
    email: 'ssabashvili37@gmail.com',
    personalId: '01719091245',
    firstName: 'Saba',
    lastName: 'Sabashvili',
    dateOfBirth: '08/04/2004',
    category: '',
    status: ''
  }];
}
