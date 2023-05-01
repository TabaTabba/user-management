import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  categoryFilterForm: FormGroup | any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.categoryFilterForm = new FormGroup({
      'category': new FormControl('')
    })
  }


  onClear() {
    this.categoryFilterForm.reset();
  }
}
