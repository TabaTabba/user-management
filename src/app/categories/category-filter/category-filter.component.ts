import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  categoryFilterForm: FormGroup | any;
  
  @Output() filterEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.categoryFilterForm = new FormGroup({
      'value': new FormControl('')
    })
  }

  onClear() {
    this.categoryFilterForm.reset();
  }

  onSubmit(){
    const filterValues = this.categoryFilterForm.value;
    this.filterEvent.emit(filterValues);
  }
}