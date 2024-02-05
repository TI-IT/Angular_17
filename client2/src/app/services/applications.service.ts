import {Injectable, OnInit, signal} from '@angular/core';
import {AddClientsComponent} from "../pages/crm/clients/add-clients/add-clients.component";
import {ICreateApplications} from "../typeScript/interfaces";
import {ApplicationsClientsService} from "./applications-clients.service";
import {ClientsService} from "./clients.service";
import {MatDialog} from "@angular/material/dialog";
import {GlobalSnackBarService} from "./global-snack-bar.service";
import {GlobalFunctionsService} from "./global-functions.service";
import {ApiApplicationsService} from "./api/api-applications.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService implements OnInit {
  setSelectData = signal<string[]>(['USA', 'UK', 'Canada', 'UK'])
  selectSelectData = signal<string>('')
  getSelectData = signal<string>('')
  updateApplicationData = signal<ICreateApplications>(
    {
      _id: '',
      addressObject: '',
      applicationNumber: 0,
      description: '',
      applicationSourceName: '',
      clientsName: '',
      email: '',
      numberPhone: '',
      typesJobsName: '',
    }
  )
  applicationsFormatView = signal<ICreateApplications[]>([])

  formatPhone = this._applicationsClientsService.formatPhone
  selectClientsListArrayRequireNumberPhone = this._applicationsClientsService.selectClientsListArrayRequireNumberPhone
  viewFormatPhone = this._applicationsClientsService.viewFormatPhone
  requireNumberPhone = this._clientsService.requireNumberPhone
  clientsListArray = this._clientsService.clientsListArray

  readOnly = this._applicationsClientsService.readOnly
  createFormatPhone = this._global.createFormatPhone


  constructor(
    private _applicationsClientsService: ApplicationsClientsService,
    private _global: GlobalFunctionsService,
    private _clientsService: ClientsService,
    private _dialog: MatDialog,
    private _apiService: ApiApplicationsService,
    private _snackBarService: GlobalSnackBarService,

  ) {
  }

  ngOnInit(): void {
  }

  getApplicationsList() {
    this._apiService.getAll('applications')
      .subscribe({
        next: (res: []) => {
          if (res.length > 0) {
            res.map(obj => {
              const clientsName = obj['_clientsId'] ? obj['_clientsId']['clientsName'] : '';
              const numberPhone = obj['_clientsId'] ? obj['_clientsId']['numberPhone'] : '';
              const email = obj['_clientsId'] ? obj['_clientsId']['email'] : '';
              const typesJobsName = obj['_typesJobsId'] ? obj['_typesJobsId']['typesJobsName'] : '';
              const applicationSourceName = obj['_applicationSourceId'] ? obj['_applicationSourceId']['applicationSourceName'] : '';

              const createObject: ICreateApplications = {
                _id: obj['_id'],
                applicationNumber: obj['applicationNumber'],
                clientsName,
                numberPhone,
                email,
                typesJobsName: typesJobsName,
                addressObject: obj['addressObject'],
                description: obj['description'],
                applicationSourceName: applicationSourceName,
                createDate: obj['createDate'],
              }
              this.applicationsFormatView.update((val: any)=>(
                [...val,  val.push(createObject)]
              ))
            })
          }
        },
        error: (err) => {
          console.log(err)
        },
      })
  }


  validatorsNumberPhone(EditForm: any, nativeElement: any = null) {
    this.readOnly.set(true)
    this.formatPhone.set('')
    //форматируем текст - убираем все кроме чисел и удоляем первый символ
    const formatStr = (EditForm.value.numberPhone).replace(/\D+/g, '').substring(1)
    //Проверка количества символов
    if (formatStr.length === 10) {
      //Запрещаем ввод данных
      // this.readonlyFormPhone.set(true)
      this.readOnly.set(true)
      //Сохраняем отформатированный телефон
      this.formatPhone.set(formatStr)

      //Закрываем предупреждения
      this._snackBarService.closeSnackBar()
      //Проверка наличия клиента
      const resData = this.checkingClient(formatStr)
      if (resData.length > 0) {
        this._snackBarService.openSnackBar('найдено совпадение')
      } else {
        //Сохраняем отформатированный телефон
        this.formatPhone.set(formatStr)
        // Создаем телефон для показа
        this.viewFormatPhone.set(this.createFormatPhone(formatStr))
        nativeElement?.focus()
      }
    }
    this.readOnly.set(false)
  }

  checkingClient(formatStr: string) {
    this.selectClientsListArrayRequireNumberPhone.set([])
    this.requireNumberPhone.set(formatStr)
    if (this.clientsListArray().length > 0) {
      this.clientsListArray().forEach(client => {
        if (client.numberPhone === this.requireNumberPhone()) {
          this.selectClientsListArrayRequireNumberPhone.update((val: any)=>(
            [...val,  val.push(client)]
          ))
        }
      })
    }
    return this.selectClientsListArrayRequireNumberPhone()
  }

  openDialogClientsForm() {
    if (this.formatPhone()) {
      //Форматировать телефон для отображения
      this._dialog.open(AddClientsComponent)
    } else {
      this._snackBarService.openSnackBar('Телефон не корректный *')
    }
  }

}
