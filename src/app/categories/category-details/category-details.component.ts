import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  category: Category = {};

  constructor(
    public dialogRef: MatDialogRef<CategoryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}