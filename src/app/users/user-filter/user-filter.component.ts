import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/categories/category.model';
import { Status } from 'src/app/models/statuses/status.model';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  userFilterForm: FormGroup | any;

  @Input() categories?: Category[];
  @Input() statuses?: Status[];

  @Output() onFilterEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let email = '';
    let personalId = '';
    let firstName = '';
    let lastName = '';
    let category = '';
    let status = '';

    this.userFilterForm = new FormGroup({
      'email': new FormControl(email),
      'personalId': new FormControl(personalId),
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'category': new FormControl(category),
      'status': new FormControl(status)
    })
  }

  onClear() {
    this.userFilterForm.reset({
      email: '',
      personalId: '',
      firstName: '',
      lastName: '',
      category: '',
      status: ''
    });
  }

  onSubmit() {
    this.onFilterEvent.emit(this.userFilterForm.value);
  }
}