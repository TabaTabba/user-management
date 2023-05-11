import { NgModule } from "@angular/core";
import { UserFilterComponent } from "./user-filter/user-filter.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersComponent } from "./users.component";
import { SharedModule } from "../shared/shared.module";
import { ConfirmDialogComponent } from "../shared/confirm-dialog.component";

@NgModule({
   declarations: [
      UsersComponent,
      UserFilterComponent,
      UserListComponent,
      ConfirmDialogComponent
   ],
   imports: [
      SharedModule
   ],
   exports: [
      UsersComponent,
      UserFilterComponent,
      UserListComponent,
      ConfirmDialogComponent
   ]
})
export class UsersModule { }