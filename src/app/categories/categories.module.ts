import { NgModule } from "@angular/core";
import { CategoriesComponent } from "./categories.component";
import { CategoryFilterComponent } from "./category-filter/category-filter.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { SharedModule } from "../shared/shared.module";
import { CategoryDetailsComponent } from './category-details/category-details.component';

@NgModule({
 declarations: [
    CategoriesComponent,
    CategoryFilterComponent,
    CategoryListComponent,
    CategoryDetailsComponent
],
 imports: [SharedModule],
 exports: [
    CategoriesComponent,
    CategoryFilterComponent,
    CategoryListComponent
]
})
export class CategoriesModule{}