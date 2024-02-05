import {Injectable, OnInit} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService implements OnInit{
  private _OFC: any
  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

  openTop(message: string, action?: string){
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    })
  }
  openBottom(message: string, action?: string){
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom'
    })
  }

  openFromComponent<T, D = any>(component: ComponentType<T>, data: string){
    this._OFC = this._snackBar.openFromComponent(component,  {
      // duration: 10000,
      data: data,
      horizontalPosition: 'center',
    })
  }
  closeFromComponent(){
    this._OFC.dismiss()
  }
}
