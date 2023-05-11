import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/statuses/status.model';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.scss']
})
export class StatusDetailsComponent implements OnInit {
  status: Status = {};
  @Input() dialogTitle: string = 'Edit status';

  constructor(
    public dialogRef: MatDialogRef<StatusDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Status
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.status = { ...this.data };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}