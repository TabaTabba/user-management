import { NgModule } from "@angular/core";
import { UserFilterComponent } from "./user-filter/user-filter.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersComponent } from "./users.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
   declarations: [
      UsersComponent,
      UserFilterComponent,
      UserListComponent
   ],
   imports: [
      SharedModule
   ],
   exports: [
      UsersComponent,
      UserFilterComponent,
      UserListComponent
   ]
})
export class UsersModule { }