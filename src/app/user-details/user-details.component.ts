import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Status } from '../models/status.model';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  categories: Category[] = [];
  statuses: Status[] = [];

  userCreateForm?: FormGroup;

  buttonText?: string;

  idParam: string | null = this.route.snapshot.paramMap.get('id');
  id: number | null = this.idParam ? +this.idParam : null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private statusService: StatusService) {}

  ngOnInit(): void {
    this.initForm();
    if (this.id == 0) {
      this.buttonText = "Add"
    } else {
      this.buttonText = "Save"
    }
    this.getCategories();
    this.getStatuses();
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
        'email': new FormControl(email, [Validators.required, Validators.email]),
        'personalId': new FormControl(personalId, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]+$/)]),
        'firstName': new FormControl(firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'lastName': new FormControl(lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'dateOfBirth': new FormControl(dateOfBirth, Validators.required),
        'category': new FormControl(category, Validators.required),
        'status': new FormControl(status, Validators.required)
      })
    } else if(this.id) {
      this.userService.getUser(this.id).subscribe((user) => {
        this.userCreateForm = new FormGroup({
          'email': new FormControl(user.email, [Validators.required, Validators.email]),
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
    if (this.id == 0 && this.userCreateForm) {
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
        this.userService.addUser(user).subscribe(() => { });
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
        this.userService.updateUser(user, this.id).subscribe(() => { });
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
}