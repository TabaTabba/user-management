import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent {

  statusFilterForm: FormGroup | any;

  @Output() onFilterEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.statusFilterForm = new FormGroup({
      'value': new FormControl('')
    })
  }

  onClear() {
    this.statusFilterForm.reset({
      value: ''
    });
    this.onSubmit();
  }

  onSubmit() {
    this.onFilterEvent.emit(this.statusFilterForm.value.value);
  }
}