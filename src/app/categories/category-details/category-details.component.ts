import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit{
  category: Category = {};
  @Input() dialogTitle: string = 'Edit category';

  constructor(
    public dialogRef: MatDialogRef<CategoryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.category = { ...this.data};
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}