import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/categories/category.model';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryFilter } from 'src/app/models/categories/category-filter.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnChanges {
  @Input() pageIndex?: number;
  @Input() categories: Category[] = [];
  @Input() categoriesCount?: number;

  @Output() onDeleteEvent = new EventEmitter<number>();
  @Output() onEditEvent = new EventEmitter<Category>();
  @Output() onPaginate = new EventEmitter<any>();

  categoryFilter: CategoryFilter = {};

  displayedColumns: string[] = ['category', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      this.initializeDataSource();
    }
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<Category>(this.categories);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.onDeleteEvent.emit(id);
      }
    });
  }

  openDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        category.value = result;
        this.onEditEvent.emit(category);
      }
    });
  }

  onPaginateChange(data: any) {
    this.onPaginate.emit(data);
  }
}