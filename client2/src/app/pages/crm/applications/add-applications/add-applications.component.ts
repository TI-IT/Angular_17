import {Component, Inject, OnInit, signal} from '@angular/core';
import {AddClientsComponent} from "../../clients/add-clients/add-clients.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITypesJobs} from "../../../../typeScript/interfaces";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ApplicationsClientsService} from "../../../../services/applications-clients.service";
import {ClientsService} from "../../../../services/clients.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {ApplicationsService} from "../../../../services/applications.service";
import {ApiApplicationsService} from "../../../../services/api/api-applications.service";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {DialogOneComponent} from "../../components/dialog-one/dialog-one.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-add-applications',
  standalone: true,
  imports: [
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
  templateUrl: './add-applications.component.html',
  styleUrl: './add-applications.component.scss'
})
export class AddApplicationsComponent implements OnInit {
  empForm!: FormGroup
  typesJobs!: ITypesJobs[]
  applicationNumberLast = signal<number>(0);
  viewFormatPhone = this._appService.viewFormatPhone
  applicationSourcesList = this._dialogOneService.applicationSourcesList;
  typesJobsNameList = this._dialogOneService.typesJobsNameList;
  clientsSelectId = signal<string>('');
  clientsListArray = this._clientsService.clientsListArray

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _applicationsClientsService: ApplicationsClientsService,
    private _appService: ApplicationsService,
    private _fb: FormBuilder,
    private _apiService: ApiApplicationsService,
    private _dialogRef: MatDialogRef<AddClientsComponent>,
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
    private _clientsService: ClientsService,
    private _snackBarService: GlobalSnackBarService,
  ) {
    console.log('8888', this.clientsListArray())
  }

  ngOnInit(): void {
    this.clientsListArray.set([])
    this.getApplicationNumberLast();
    this.getAll();
    this.typesJobs = this.typesJobsNameList()
    this.createEmpForm()

    if (this.data) {
      this.clientsSelectId.set(this.data._id);
      this.empForm.controls['_clientsId'].setValue(this.data.clientsName, {onlySelf: true})
    }
    this.empForm.controls['_clientsId'].valueChanges.subscribe((value: string) => {
      console.log('value===>', value)
      this.clientsSelectId.set(value); // обновленное значение элемента формы
    });
  }

  createEmpForm() {
    this.empForm = this._fb.group({
      applicationNumber: this.applicationNumberLast(),
      _clientsId: [this.data?._id, Validators.required],
      addressObject: [''],
      _applicationSourceId: ['', Validators.required],
      _typesJobsId: ['', Validators.required],
      description: [''],
    })
  }

  //Форматируем телефон для показа
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

  openAddClientForm() {
    this.clientsListArray.set([])
    const dialogRef = this._dialog.open(AddClientsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getAll()
        // this.newClientsSelect = true
      },
    });
  }

  //получаем последный номер заказа
  getApplicationNumberLast() {
    this._apiService.getAll('applications/numberLast').subscribe({
      next: (res) => {
        res === null
          ? this.applicationNumberLast.set(0)
          : this.applicationNumberLast.set(res.applicationNumber + 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFormSubmit() {
    this.empForm.value.applicationNumber = this.applicationNumberLast()
    console.log(this.empForm.value)
    if (this.empForm.valid) {
      this.empForm.value._clientsId = this.clientsSelectId()
      this._apiService.add('applications', this.empForm.value).subscribe({
        next: (val: any) => {
          this._snackBarService.openSnackBar('Заявка добавлена')

          this._dialogRef.close(true)
        },
        error: (err: any) => {
          console.error(err)
          this._snackBarService.openSnackBar(err.error.message)
        },
      })

    } else {
      // Получаем список ошибок для каждого поля формы
      Object.keys(this.empForm.controls).forEach(fieldName => {
        const formControl = this.empForm.get(fieldName);
        // Если поле содержит ошибку валидации, выделяем его и выводим сообщение об ошибке
        if (formControl?.touched && formControl?.invalid) {
          const errors = formControl.errors;
          if (errors) {
            Object.keys(errors).forEach(errorName => {
              this.empForm.get(fieldName)?.setErrors({[errorName]: true});
              this._snackBarService.openSnackBar(`${fieldName}: ${errorName}`);
            });
          }
        }
      });
    }
    this.getApplicationNumberLast();
  }
}
