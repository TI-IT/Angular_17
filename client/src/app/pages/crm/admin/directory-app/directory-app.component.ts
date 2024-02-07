import {Component, OnInit} from '@angular/core';
import {CrudOneDataComponent} from "../crud-one-data/crud-one-data.component";
import {Subscription} from "rxjs";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {ApiAdminService} from "../api-admin.service";
import {ICrudOneData} from "../../../../typeScript/interfaces";

@Component({
  selector: 'app-directory-app',
  standalone: true,
  imports: [
    CrudOneDataComponent
  ],
  templateUrl: './directory-app.component.html',
  styleUrl: './directory-app.component.scss'
})
export class DirectoryAppComponent implements OnInit{
  aSub!: Subscription;
  crudDataArray: any = []

  collectionsObjectsData = [
    {urlPostfix: 'roles', collectionNameUpdate: 'roleName', description: 'роль'},
    {urlPostfix: 'types_jobs', collectionNameUpdate: 'typesJobsName', description: 'Тип работ'},
  ]
  constructor(
    private _api: ApiAdminService,
    private _snackBar: SnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.createCrudDataArray()
  }

  createCrudDataArray() {
    this.collectionsObjectsData.forEach(getData => {
      this.getData(getData)
    });
  }

  getData(objectData: any){
    const dataList: any = []
    this.aSub = this._api.getAll(objectData.urlPostfix).subscribe({
      next: ({ message, data }: { message: string, data: any[] }) => { // data теперь имеет тип any[]
        this._snackBar.openTop(message);
        data.forEach(item => {
          dataList.push({
            _id: item._id ? item._id : 'нет записи',
            name: item[objectData.collectionNameUpdate] ? item[objectData.collectionNameUpdate] : objectData.collectionNameUpdate,
          })
        });
        const newData: ICrudOneData = {
          collectionNameUpdate: objectData.collectionNameUpdate,
          urlPostfix: objectData.urlPostfix,
          matLabel: objectData.description,
          dataList: dataList
        }
        this.crudDataArray.push(newData);
      },
      error: (error) => {
        this._snackBar.openTop(error.error.message);
      },
    });
  }
}
