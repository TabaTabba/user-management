import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categories/category.model';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryFilter } from '../models/categories/category-filter.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesCount?: number;
  categories: Category[] = [];

  categoryFilter: CategoryFilter = {
    _page: 0,
    _limit: 10,
    value: ""
  }

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories(this.categoryFilter);
  }

  getCategories(categoryFilter: CategoryFilter) {
    this.categoryService.getCategoriesWithCount(categoryFilter).subscribe((categories) => {
      this.categories = categories.data || [];
      this.categoriesCount = categories.count;
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories(this.categoryFilter);
    });
  }

  addCategory(category: Category) {
    if (category.value) {
      this.categoryService.addCategory(category).subscribe(() => {
        this.getCategories(this.categoryFilter);
      });
    }
  }

  editCategory(category: Category) {
    if (category.value && category.id) {
      this.categoryService.updateCategory(category.value, category.id).subscribe(() => {
        this.getCategories(this.categoryFilter);
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
      data: null
    });
    dialogRef.componentInstance.dialogTitle = 'Add Category';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory(result);
      }
    });
  }

  filterCategories(value: string) {
    this.categoryFilter._page = 0;
    this.categoryFilter.value = value;
    this.getCategories(this.categoryFilter);
  }

  paginate(paginatorData: any) {
    this.categoryFilter._page = paginatorData.pageIndex + 1;
    this.categoryFilter._limit = paginatorData.pageSize;
    this.getCategories(this.categoryFilter)
  }
}