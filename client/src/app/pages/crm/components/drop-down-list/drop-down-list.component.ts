import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiSharedService} from "../../../../services/api/api-shared.service";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOneComponent} from "../dialog-one/dialog-one.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-drop-down-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatSelect,
    MatButton,
    MatOption,
    MatIcon
  ],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.scss'
})

// ***********************
// ***********************
// *** Для вызова использовать шаблон ниже
// <app-dropDownList

//   [filter]="'selected name'"
//   [selectedName]="'selected name'"
//   [dbName]="'roles'"
//   [valueSelectName]="'roleName'"
//   [titleSelectName]="'Роль'"
// (selected)="rolesSelected($event)">
//   </app-dropDownList>
// ***


export class DropDownListComponent implements OnInit, OnDestroy {
  @Input() dbName!: string;
  @Input() valueSelectName!: string;
  @Input() titleSelectName!: string;
  @Input() selectedName!: string;
  @Input() selectedUpdateData!: string;
  @Input() filter!: string;
  @Output() selected = new EventEmitter<any>();
  aSub!: Subscription;
  list: any[] = [];

  constructor(
    private api: ApiSharedService,
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.dbName && this.valueSelectName) {
      this.getData();
    }
  }

  getData() {
    this.aSub = this.api.getAll(this.dbName).subscribe({
      next: ({message, data }) => {
        this.list = []
        console.log('filter', this.filter)
        if(data.length > 0){
          data.forEach((i: { _id: string; [key: string]: string }) => {
            if ('_id' in i && this.valueSelectName in i) {
              this.list.push({
                id: i._id,
                value: i[this.valueSelectName],
              });
            }
          });
        } else {
          this.list.push({
            id: 0,
            value: 'Список пуст',
          });
        }
      },
      error: error => {
        this.list.push({
          id: 0,
          value: 'Список не найден',
        });
        console.log(error.error.message);
      },
    });
  }

  onSelectChange(event: any, selectedName:string) {
    // console.log(list)
    this.selected.emit({
      selectedId: event.value,
      selectedName: this.selectedName
    });
  }

  openDialogOneForm(name: string, title: string, urlPostfix: string) {
    this._dialogOneService.title.set(title);
    this._dialogOneService.name.set(name);
    this._dialogOneService.urlPostfix.set(urlPostfix);

    const dialogRef = this._dialog.open(DialogOneComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Диалоговое окно закрыто');
      this.getData()
      // Обработайте результат здесь (если он есть)
      // Например, обновите данные на странице
    });
  }

  ngOnDestroy(): void {
    //отписываемся от стрима
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}

