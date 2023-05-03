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

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  onDelete(event: any) {
    const id = event as number;
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }

  onAdd(category: Category) {
    this.categoryService.addCategory(category).subscribe(() => {
      this.getCategories();
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.category = { value: result };
      this.onAdd(this.category);
    });
  }
}