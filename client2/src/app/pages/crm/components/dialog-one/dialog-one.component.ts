import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ApiSharedService} from "../../../../services/api/api-shared.service";

@Component({
  selector: 'app-dialog-one',
  standalone: true,
  imports: [
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
  templateUrl: './dialog-one.component.html',
  styleUrl: './dialog-one.component.scss'
})
export class DialogOneComponent implements OnInit {
  title = this.dialogOneService.title
  name = this.dialogOneService.name
  urlPostfix = this.dialogOneService.urlPostfix


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
        [this.name()]: [''],
      });
    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      // console.log(this.data)
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
        this.api.add(this.urlPostfix(), this.empForm.value).subscribe({
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
    if (val['typesJobsName']) {
      this.dialogOneService.addItemsTypesJobsName([val])
    }
    if (val['applicationSourceName']) {
      this.dialogOneService.addItemsApplicationSourceName([val])
    }
  }
}

