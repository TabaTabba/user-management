import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './user-details.component';



@NgModule({
  declarations: [UserDetailsComponent],
  imports: [SharedModule],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule { }
