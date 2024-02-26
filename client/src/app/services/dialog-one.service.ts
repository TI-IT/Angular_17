import {Injectable, signal} from '@angular/core';
import {IApplicationSources, IJobTitle, IOneSelected, ITypesJobs} from "../typeScript/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DialogOneService {
  title = signal<string>('')
  name = signal<string>('')
  urlPostfix = signal<string>('')

  //Catalogs
  nameCategory = signal<string>('')

  typesJobsNameList = signal<ITypesJobs[]>([])
  applicationSourcesList = signal<IApplicationSources[]>([])
  jobTitleNameList = signal<IJobTitle[]>([])
  categoryNameList = signal<IOneSelected[]>([])
  currencyNameList = signal<string[]>([])
  unitNameList = signal<string[]>([])
  catalogNameList = signal<string[]>([])
  categoriesNameList = signal<string[]>([])

  constructor(
    private _snackBar: MatSnackBar,
  ) {
  }

  addItemsTypesJobsName(data: ITypesJobs[]) {
    this.typesJobsNameList.set(data)
  }

  addItemsApplicationSourceName(data: IApplicationSources[]) {
    this.applicationSourcesList.set(data)
  }
  addItemsCatalogName(data: IOneSelected[]) {
    console.log('addItemsCatalogName', data)
    this.categoryNameList.set(data)
  }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    })
  }
}
