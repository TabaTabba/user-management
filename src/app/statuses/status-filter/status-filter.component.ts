import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent {

  statusFilterForm: FormGroup | any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.statusFilterForm = new FormGroup({
      'status': new FormControl('')
    })
  }


  onClear() {
    this.statusFilterForm.reset();
  }
}
