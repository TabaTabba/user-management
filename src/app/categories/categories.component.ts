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
  categoryCount?: number;
  categories: Category[] = [];

  category: Category = {};

  categoryFilter : CategoryFilter = {}

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories(this.categoryFilter);
  }

  getCategories(categoryFilter: CategoryFilter) {
    this.categoryService.getCategoriesWithCount(categoryFilter).subscribe((categories) => {
      this.categories = categories.data || []
      this.categoryCount = categories.count
      console.log(this.categoryCount)
    });
  }

  deleteCategory(event: any) {
    const id = event as number;
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

  filterCategories(value: string){
    this.categoryFilter.value = value;
    this.categoryFilter._page = 1;
    this.categoryFilter._limit = 1;
    this.getCategories(this.categoryFilter);
  }
}