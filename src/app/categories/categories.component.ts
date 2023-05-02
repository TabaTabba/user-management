import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
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

  onAdd(category: Category){
    this.categoryService.addCategory(category).subscribe(() => {});
  }
}
