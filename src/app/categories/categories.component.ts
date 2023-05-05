import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from './category-details/category-details.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  category: Category = {};

  text: string = 'Edit';

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  deleteCategory(event: any) {
    const id = event as number;
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }

  addCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(() => {
      this.getCategories();
    });
  }

  editCategory(category: Category) {
    if (category.value && category.id) {
      this.categoryService.updateCategory(category.value, category.id).subscribe(() => {
        this.getCategories();
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
}