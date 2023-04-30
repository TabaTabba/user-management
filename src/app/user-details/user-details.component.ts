import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  categories: Category[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  userCreateForm: FormGroup | any;
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let email = '';
    let personalId = '';
    let firstName = '';
    let lastName = '';
    let dateOfBirth = '';
    let category = '';
    let status = '';

    this.userCreateForm = new FormGroup({
      'email': new FormControl(email),
      'personalId': new FormControl(personalId),
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'dateOfBirth': new FormControl(dateOfBirth),
      'category': new FormControl(category),
      'status': new FormControl(status)
    })
  }

  onSubmit(){}
  
}

interface Category {
  value: string;
  viewValue: string;
}