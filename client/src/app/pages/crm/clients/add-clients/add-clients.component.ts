import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationsClientsService} from "../../../../services/applications-clients.service";
import {ClientsService} from "../../../../services/clients.service";
import {ApiClientsService} from "../../../../services/api/api-clients.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-add-clients',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './add-clients.component.html',
  styleUrl: './add-clients.component.scss'
})
export class AddClientsComponent implements OnInit {
  @ViewChild('input4') input4!: ElementRef;
  empForm!: FormGroup
  readOnly = this._applicationsClientsService.readOnly
  viewFormatPhone = this._appService.viewFormatPhone
  clientsSelect = this._applicationsClientsService.clientsSelect

  constructor(
    private _applicationsClientsService: ApplicationsClientsService,
    private _appService: ClientsService,
    private _fb: FormBuilder,
    private _apiService: ApiClientsService,
    private _dialogRef: MatDialogRef<AddClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: GlobalSnackBarService,

  ) {
  }

  ngOnInit(): void {
    this.createEmpForm()
    if(this.data){
      this.empForm.patchValue(this.data)
    }
  }

  createEmpForm() {
    this.empForm = this._fb.group({
      clientsName: ['', Validators.required],
      email: '',
      numberPhone: ['', [
        Validators.required,
        Validators.pattern('^\\D*(\\d\\D*){11}$')
      ]],
      description: '',
    })
  }

  //Для проверки уникальности номера
  validatorsNumberPhone() {
    const dialogRefClose = this._appService.validatorsNumberPhone(this.empForm, this.input4.nativeElement)
    //Закрываем Диалоговое окно при совпадении
    if (dialogRefClose?.dialogRef){
      this._dialogRef.close(true)
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empForm.value.numberPhone =  this.empForm.value.numberPhone.replace(/\D+/g, '').substring(1)
        this._apiService
          .update(this.data._id, 'clients', this.empForm.value)
          .subscribe({
            next: (val) => {
              this._snackBarService.openSnackBar('Обновление прошло успешно')
              this.clientsSelect.set(val)
              this._dialogRef.close(true)
            },
            error: (err: any) => {
              console.error(err)
            },
          })
      } else {
        this.empForm.value.numberPhone =  this.empForm.value.numberPhone.replace(/\D+/g, '').substring(1)
        this._apiService.add('clients', this.empForm.value).subscribe({
          next: (val: any) => {
            this._snackBarService.openSnackBar('Клиенд добавлен')
            this.clientsSelect.set(val)
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
            this._snackBarService.openSnackBar(err.error.message)
          },
        })
      }
    }
  }
}
