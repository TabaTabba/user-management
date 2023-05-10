import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  categoryFilterForm: FormGroup | any;

  @Output() onFilterEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryFilterForm = new FormGroup({
      'value': new FormControl('')
    })
  }

  onClear() {
    this.categoryFilterForm.reset({
      value: ''
    });
    this.onSubmit();
  }

  onSubmit() {
    this.onFilterEvent.emit(this.categoryFilterForm.value.value);
  }
}