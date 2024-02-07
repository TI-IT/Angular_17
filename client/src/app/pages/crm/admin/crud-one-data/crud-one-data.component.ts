import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {ICrudOneData, IDataList} from "../../../../typeScript/interfaces";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOneComponent} from "../../components/dialog-one/dialog-one.component";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-crud-one-data',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatSelect,
    MatButton,
    MatOption
  ],
  templateUrl: './crud-one-data.component.html',
  styleUrl: './crud-one-data.component.scss'
})
export class CrudOneDataComponent implements OnInit {
  @Input() data!: ICrudOneData
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();

  matLabel!: string
  collectionNameUpdate!: string
  dataList!: IDataList[]
  urlPostfix!: string
  formControlName!: string

  constructor(
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.formControlName = '_typesJobsId'
    this.matLabel = this.data.matLabel
    this.collectionNameUpdate = this.data.collectionNameUpdate
    this.dataList = this.data.dataList
    this.urlPostfix = this.data.urlPostfix
  }

  openDialogOneForm() {
    this._dialogOneService.title.set(this.matLabel);
    this._dialogOneService.name.set(this.collectionNameUpdate);
    this._dialogOneService.urlPostfix.set(this.urlPostfix);
    this._dialog.open(DialogOneComponent);
  }

  delete(){
    console.log()
  }
}
