import { Component } from '@angular/core';
import { Status } from '../models/status.model';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent {
  statuses: Status[] = [];

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses(){
    this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    })
  }

  onDelete(event: any) {
    const id = event as number;
    this.statusService.deleteStatus(id).subscribe(() => {
      this.getStatuses();
    });
  }
}
