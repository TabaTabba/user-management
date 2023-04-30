import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "../app-routing.module";


@NgModule({
 declarations: [],
 imports: [],
 exports: [
   MatTableModule,
   MatPaginatorModule,
   MatInputModule,
   MatButtonModule,
   ReactiveFormsModule,
   MatSelectModule,
   BrowserAnimationsModule,
   AppRoutingModule
 ]
})
export class SharedModule{} 