import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDetailsComponent } from 'src/app/categories/category-details/category-details.component';
import { Status } from 'src/app/models/status.model';
import { StatusDetailsComponent } from '../status-details/status-details.component';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent {
  @Input() statuses?: Status[];
  @Output() deleteEvent = new EventEmitter();


  displayedColumns: string[] = ['status', 'actions'];
  dataSource = new MatTableDataSource<Status>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['statuses']){
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  initializeDataSource(){
    if(this.statuses){
      this.dataSource = new MatTableDataSource<Status>(this.statuses);
    }
  }

  onDelete(id: number){
    this.deleteEvent.emit(id);
  }
  
  openDialog(){
    this.matDialog.open(StatusDetailsComponent,{
      width: '350px'
    });
  }
}
