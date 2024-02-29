import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(component: any, config?: MatDialogConfig): MatDialogRef<any> {
    const dialogConfig = config || new MatDialogConfig();
    dialogConfig.backdropClass = 'dark-backdrop';
    return this.dialog.open(component, dialogConfig);
  }
}
