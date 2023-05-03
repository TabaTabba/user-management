import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.scss']
})
export class StatusDetailsComponent implements OnInit {
  statusDetailsForm: FormGroup | any;

  @Output() addEvent = new EventEmitter();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.statusDetailsForm = new FormGroup({
      'status': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    const status: Status = {
      value: this.statusDetailsForm.value.status
    }
    this.addEvent.emit(status);
  }
}
