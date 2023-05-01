import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  categories: Category[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  userCreateForm?: FormGroup;

  buttonText?: string;

  idParam: string | null = this.route.snapshot.paramMap.get('id');
  id: number | null = this.idParam ? +this.idParam : null;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    if (this.idParam == "0") {
      this.buttonText = "Add"
    } else {
      this.buttonText = "Save"
    }
  }

  initForm() {
    if (this.id === 0) {
      let email = '';
      let personalId = '';
      let firstName = '';
      let lastName = '';
      let dateOfBirth = '';
      let category = '';
      let status = '';

      this.userCreateForm = new FormGroup({
        'email': new FormControl(email, Validators.required),
        'personalId': new FormControl(personalId, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]+$/)]),
        'firstName': new FormControl(firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'lastName': new FormControl(lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'dateOfBirth': new FormControl(dateOfBirth, Validators.required),
        'category': new FormControl(category, Validators.required),
        'status': new FormControl(status, Validators.required)
      })
    } else if (this.id !== null) {
      this.usersService.getUser(this.id).subscribe((user) => {
        this.userCreateForm = new FormGroup({
          'email': new FormControl(user.email, Validators.required),
          'personalId': new FormControl(user.personalId, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]+$/)]),
          'firstName': new FormControl(user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          'lastName': new FormControl(user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          'dateOfBirth': new FormControl(user.dateOfBirth, Validators.required),
          'category': new FormControl(user.category, Validators.required),
          'status': new FormControl(user.status, Validators.required)
        })
      });
    }

  }

  onSubmit() {
    if (this.id == 0 && this.userCreateForm !== undefined) {
      const formValues = this.userCreateForm.value;
      const user: User = {
        email: formValues.email,
        personalId: formValues.personalId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        dateOfBirth: formValues.dateOfBirth,
        category: formValues.category,
        status: formValues.status
      };
      if (this.userCreateForm.valid) {
        this.usersService.addUser(user).subscribe(() => { });
        this.router.navigate(['/users']);
      }
    } else if(this.userCreateForm !== undefined){
      const formValues = this.userCreateForm.value;
      const user: User = {
        email: formValues.email,
        personalId: formValues.personalId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        dateOfBirth: formValues.dateOfBirth,
        category: formValues.category,
        status: formValues.status
      };
      if (this.userCreateForm.valid) {
        this.usersService.updateUser(user, this.id).subscribe(() => { });
        this.router.navigate(['/users']);
      }
    }
  }

  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyDown(event: any, max: number) {
    const maxLength = max;
    const currentValue = event.target.value;

    if (currentValue.length >= maxLength && event.keyCode !== 8) {
      event.preventDefault();
    }
  }
}

interface Category {
  value: string;
  viewValue: string;
}