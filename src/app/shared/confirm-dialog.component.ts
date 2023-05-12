import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  template: `<h1 mat-dialog-title>Delete Confirmation</h1>
    <div mat-dialog-content>
     Do you want to delete this record?
    </div>
    <div mat-dialog-actions class='button-wrapper'>
      <button mat-button (click)="dialogRef.close('no')">No</button>
      <button mat-button (click)="dialogRef.close('yes')" cdkFocusInitial>Yes</button>
    </div>`,
  styles: ['.button-wrapper { float: right; }']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}