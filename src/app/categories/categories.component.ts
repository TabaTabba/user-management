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

  constructor(private categoryService: CategoryService, private matDialog: MatDialog) { }

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
    console.log(category,  'onadd')
    this.categoryService.addCategory(category).subscribe(() => {
      this.getCategories();
    });
  }

  openDialog() {
    this.matDialog.open(CategoryDetailsComponent, {
      width: '350px'
    });
  }
}