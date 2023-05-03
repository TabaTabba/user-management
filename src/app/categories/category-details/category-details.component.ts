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

  @Output() addEvent = new EventEmitter<Category>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryDetailsForm = new FormGroup({
      'category': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.addEvent.emit(this.categoryDetailsForm.value.category);
  }
}