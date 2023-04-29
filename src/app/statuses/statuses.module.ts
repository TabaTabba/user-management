import { NgModule } from "@angular/core";
import { StatusFilterComponent } from "./status-filter/status-filter.component";
import { StatusListComponent } from "./status-list/status-list.component";
import { StatusesComponent } from "./statuses.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
 declarations: [
    StatusesComponent,
    StatusFilterComponent,
    StatusListComponent
 ],
 imports: [SharedModule],
 exports: [
    StatusesComponent,
    StatusFilterComponent,
    StatusListComponent]
})
export class StatusesModule{}