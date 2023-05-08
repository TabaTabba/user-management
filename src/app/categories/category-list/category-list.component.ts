import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/categories/category.model';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryFilter } from 'src/app/models/categories/category-filter.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter<Category>();

  @Output() categoryFilterEvent = new EventEmitter<CategoryFilter>();

  categoryFilter: CategoryFilter = {}

  category: Category = {};

  displayedColumns: string[] = ['category', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator?.length
  }


  initializeDataSource() {
    if (this.categories && this.paginator) {
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
      this.paginator.length = 3

      this.categoryFilter._page = 1;
      this.categoryFilter._limit = 3;
    }
  }

  onDelete(id: number) {
    this.deleteEvent.emit(id);
  }

  openDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        category.value = result;
        this.editEvent.emit(category);
      }
    });
  }
}