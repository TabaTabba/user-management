import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  displayedColumns: string[] = ['category'];
  dataSource = new MatTableDataSource<Category>(CATEGORY_DATA);



  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}

const CATEGORY_DATA: Category[] = [
  { value: 'H' },
  { value: 'H' },
  { value: 'H' },
  { value: 'H' }
];


