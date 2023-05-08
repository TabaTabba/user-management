import { Component } from '@angular/core';
import { Status } from '../models/status.model';
import { StatusService } from '../services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusDetailsComponent } from './status-details/status-details.component';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent {
  statuses: Status[] = [];

  status: Status = {};


  constructor(private statusService: StatusService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses.reverse();
    })
  }

  deleteStatus(event: any) {
    const id = event as number;
    this.statusService.deleteStatus(id).subscribe(() => {
      this.getStatuses();
    });
  }

  addStatus(status: Status) {
    if (status.value) {
      this.statusService.addStatus(status).subscribe(() => {
        this.getStatuses();
      });
    }
  }

  editStatus(status: Status) {
    if (status.value && status.id) {
      this.statusService.updateStatus(status.value, status.id).subscribe(() => {
        this.getStatuses();
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StatusDetailsComponent, {
      data: null
    });
    dialogRef.componentInstance.dialogTitle = 'Add Status';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addStatus(result);
      }
    });
  }

  filterStatuses(filterValues: any) {
    this.statusService.filterStatuses(filterValues).subscribe((statuses) => {
      this.statuses = statuses;
    });

  }
}
