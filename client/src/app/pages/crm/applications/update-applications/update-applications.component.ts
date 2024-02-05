import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiApplicationsService} from "../../../../services/api/api-applications.service";
import {AddClientsComponent} from "../../clients/add-clients/add-clients.component";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {ClientsService} from "../../../../services/clients.service";
import {DialogOneComponent} from "../../components/dialog-one/dialog-one.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-update-applications',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatIcon,
    MatInput,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './update-applications.component.html',
  styleUrl: './update-applications.component.scss'
})
export class UpdateApplicationsComponent implements OnInit {
  typesJobsListArray = this._dialogOneService.typesJobsNameList;
  applicationSourcesListArray = this._dialogOneService.applicationSourcesList;
  clientsListArray = this._clientsService.clientsListArray
  updateForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiApplicationsService,
    private _dialogRef: MatDialogRef<AddClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: GlobalSnackBarService,
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
    private _clientsService: ClientsService,
  ) {
    this.updateForm = new FormGroup({
      country: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.clientsListArray.set([])
    this.getAll();
    this.createUpdateForm()
    if (this.data) {
      this.updateForm.patchValue(this.data)
    }
    this.updateForm.controls['_clientsId'].setValue(this.data.clientsName, {onlySelf: true})
    this.updateForm.controls['_typesJobsId'].setValue(this.data.typesJobsName, {onlySelf: true})
    this.updateForm.controls['_applicationSourceId'].setValue(this.data.applicationSourceName, {onlySelf: true})

    // this.updateForm.controls['country'].valueChanges.subscribe((value: string) => {
    //   this.selectSelectData.set(value); // обновленное значение элемента формы
    // });
    console.log(this.data)
    console.log(this.typesJobsListArray())

  }

  getAll() {
    this._apiService.getAll('types_jobs').subscribe((res) => {
      if (res.data.length > 0) {
        this._dialogOneService.addItemsTypesJobsName(res.data);
      }
    });
    this._apiService.getAll('applicationSource').subscribe((res) => {
      if (res.data.length > 0) {
        this._dialogOneService.addItemsApplicationSourceName(res.data);
      }
    });
    this._apiService.getAll('clients').subscribe((res) => {
      if (res.data.length > 0) {
        this._clientsService.addClientsArray(res.data);
      }
    });
  }

  createUpdateForm() {
    this.updateForm = this._fb.group({
      applicationNumber: [''],
      _clientsId: [''],
      addressObject: [''],
      _applicationSourceId: [''],
      _typesJobsId: [''],
      description: [''],
    })
  }

  openDialogOneForm(name: string, title: string, urlPostfix: string) {
    this._dialogOneService.title.set(title);
    this._dialogOneService.name.set(name);
    this._dialogOneService.urlPostfix.set(urlPostfix);

    const dialogRef = this._dialog.open(DialogOneComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getAll();
      },
    });
    this._snackBarService.openSnackBar('Заполните обязательные поля *');
  }

  openAddClientForm() {
    // this.viewFormatPhone.set('')
    const dialogRef = this._dialog.open(AddClientsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // if (val) {
        //   console.log('openAddEditEmpForm() {', val)
        // }
      },
    });
  }

  onFormSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.valid)
      console.log(this.data._id)
      if (this.data.clientsName === this.updateForm.value._clientsId) {
        const numberPhone = this.data.numberPhone
        const clientsId = this.clientsListArray().filter(function (client) {
          return client.numberPhone === numberPhone
        })
        this.updateForm.value._clientsId = clientsId[0]._id
      }
      if (this.data.typesJobsName === this.updateForm.value._typesJobsId) {
        const typesJobs = this.data.typesJobsName
        const typesJobsId = this.typesJobsListArray().filter(function (obj) {
          return obj.typesJobsName === typesJobs
        })
        this.updateForm.value._typesJobsId = typesJobsId[0]._id
      }
      if (this.data.applicationSourceName === this.updateForm.value._applicationSourceId) {
        const appSourceName = this.data.applicationSourceName
        const applicationSourcesId = this.applicationSourcesListArray().filter(function (obj) {
          return obj.applicationSourceName === appSourceName
        })
        this.updateForm.value._applicationSourceId = applicationSourcesId[0]._id
      }

      this._apiService
        .update(this.data._id, 'applications', this.updateForm.value)
        .subscribe({
          next: (val) => {
            this._snackBarService.openSnackBar('Заявка Обновлена!')
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          },
        })

    } else {
      // Получаем список ошибок для каждого поля формы
      Object.keys(this.updateForm.controls).forEach(fieldName => {
        const formControl = this.updateForm.get(fieldName);
        // Если поле содержит ошибку валидации, выделяем его и выводим сообщение об ошибке
        if (formControl?.touched && formControl?.invalid) {
          const errors = formControl.errors;
          if (errors) {
            Object.keys(errors).forEach(errorName => {
              this.updateForm.get(fieldName)?.setErrors({[errorName]: true});
              this._snackBarService.openSnackBar(`${fieldName}: ${errorName}`);
            });
          }
        }
      });
    }
    // this.getApplicationNumberLast();
  }
}

