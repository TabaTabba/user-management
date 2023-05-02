import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  categoryDetailsForm: FormGroup | any;

  @Output() addEvent = new EventEmitter();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryDetailsForm = new FormGroup({
      'category': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    const formValues = this.categoryDetailsForm.value;
    const category: Category = {
      value: formValues.value
    }
    this.addEvent.emit(category);
  }
}
