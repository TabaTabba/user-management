import { Component } from '@angular/core';
import { Status } from '../models/statuses/status.model';
import { StatusService } from '../services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusDetailsComponent } from './status-details/status-details.component';
import { StatusFilter } from '../models/statuses/status-filter.model';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent {
  statusesCount?: number;
  statuses: Status[] = [];

  status: Status = {};

  statusFilter : StatusFilter = {
    _page : 0,
    _limit : 10,
    value : ""
  }

  constructor(private statusService: StatusService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStatuses(this.statusFilter);
  }

  getStatuses(statusFilter: StatusFilter) {
    this.statusService.getStatusesWithCount(statusFilter).subscribe((statuses) => {
      this.statuses = statuses.data || [];
      this.statusesCount = statuses.count;
    })
  }

  deleteStatus(id: number) {
    this.statusService.deleteStatus(id).subscribe(() => {
      this.getStatuses(this.statusFilter);
    });
  }

  addStatus(status: Status) {
    if (status.value) {
      this.statusService.addStatus(status).subscribe(() => {
        this.getStatuses(this.statusFilter);
      });
    }
  }

  editStatus(status: Status) {
    if (status.value && status.id) {
      this.statusService.updateStatus(status.value, status.id).subscribe(() => {
        this.getStatuses(this.statusFilter);
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

  filterStatuses(value: string) {
    this.statusFilter._page = 0;
    this.statusFilter.value = value;
    this.getStatuses(this.statusFilter);
  }

  paginate(paginatorData : any){
    this.statusFilter._page = paginatorData.pageIndex + 1;
    this.statusFilter._limit = paginatorData.pageSize;
    this.getStatuses(this.statusFilter)
  }
}