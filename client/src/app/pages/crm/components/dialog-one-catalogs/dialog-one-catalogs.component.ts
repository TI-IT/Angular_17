import {Component, Inject, OnInit, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {ApiSharedService} from "../../../../services/api/api-shared.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-dialog-one-catalogs',
  standalone: true,
  imports: [
    HttpClientModule,
    MatDialogTitle,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './dialog-one-catalogs.component.html',
  styleUrl: './dialog-one-catalogs.component.scss'
})
export class DialogOneCatalogsComponent implements OnInit {
  nameCategory = this.dialogOneService.nameCategory
  title = this.dialogOneService.title
  name = this.dialogOneService.name
  value:string = '';

  empForm!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private dialogOneService: DialogOneService,
    private api: ApiSharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<any>,
  ) {
    if (this.name()) {
      this.empForm = this._fb.group({
        nameCategory: [this.nameCategory()],
        name: [this.name()],
        value: [''],
      });
    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      console.log('this.data', this.data)
      if (this.data) {
        // this._empService
        //   .updateEmployee(this.data.id, this.empForm.value)
        //   .subscribe({
        //     next: (val: any) => {
        //       this.dialogOneService.openSnackBar('Employee detail updated!');
        //       this._dialogRef.close(true);
        //     },
        //     error: (err: any) => {
        //       console.error(err);
        //     },
        //   });
        console.log('DialogOneComponent ==> onFormSubmit() ==> .updateEmployee')
      } else {
        this.api.add('oneSelected', this.empForm.value).subscribe({
          next: (val: any) => {
            this.addItemsVal(val)
            this.dialogOneService.openSnackBar('Сохранено');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  //Переделать чтобы автоматом ссылался на нужный service
  addItemsVal(val: any) {
    if (val.data) {
      this.dialogOneService.addItemsCatalogName([val.data.value])
    }
  }
}

