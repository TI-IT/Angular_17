import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {DialogOneComponent} from "../dialog-one/dialog-one.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-selected-one',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './selected-one.component.html',
  styleUrl: './selected-one.component.scss'
})
export class SelectedOneComponent {

  typesJobsNameList = this._dialogOneService.typesJobsNameList;

  constructor(
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
  ) {
  }

  openDialogOneForm(name: string, title: string, urlPostfix: string) {
    this._dialogOneService.title.set(title);
    this._dialogOneService.name.set(name);
    this._dialogOneService.urlPostfix.set(urlPostfix);

    const dialogRef = this._dialog.open(DialogOneComponent);
    dialogRef.afterClosed().subscribe(result => {
      // Обработайте результат здесь (если он есть)
      // Например, обновите данные на странице
    });
  }
}
