import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnChanges{
  @Input() categories?: Category[];
  @Output() deleteEvent = new EventEmitter();


  displayedColumns: string[] = ['category', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categories']){
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  initializeDataSource(){
    if(this.categories){
      this.dataSource = new MatTableDataSource<Category>(this.categories);
    }
  }

  onDelete(id: number){
    this.deleteEvent.emit(id);
  }

  openDialog(){
    this.matDialog.open(CategoryDetailsComponent,{
      width: '350px'
    });
  }
}
