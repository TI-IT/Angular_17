import {Injectable, signal} from '@angular/core';
import {IClients} from "../typeScript/interfaces";
import {ApplicationsClientsService} from "./applications-clients.service";
import {GlobalSnackBarService} from "./global-snack-bar.service";
import {ApiClientsService} from "./api/api-clients.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  title = signal<string>('')
  name = signal<string>('')
  readOnly = signal<boolean>(false)
  selectClientsListArrayRequireNumberPhone = signal<IClients[]>([])
  public viewFormatPhone = signal('')
  public formatNumberPhoneClientsList = signal<IClients[]>([])
  public clientsSelect = this._applicationsClientsService.clientsSelect

  //Для проверки уникальности номера
  requireNumberPhone = signal({})
  clientsListArray = signal<IClients[]>([])
  public formatPhone = signal('')

  constructor(
    private _applicationsClientsService: ApplicationsClientsService,
    private _snackBarService: GlobalSnackBarService,
    private _apiService: ApiClientsService,
  ) {
  }

  getClientsList() {
    this.formatNumberPhoneClientsList.set([])
    this._apiService.getAll('clients').subscribe({
      next: (res) => {
        res.forEach((obj: IClients) => {
          // создание нового объекта с обновленным свойством Телефона
          const updatedObj = {
            ...obj,
            numberPhone:
              '+7(' +
              obj.numberPhone.slice(0, 3) +
              ') ' +
              obj.numberPhone.slice(3, 6) +
              '-' +
              obj.numberPhone.slice(6, 8) +
              '-' +
              obj.numberPhone.slice(8),
          };
          // добавление нового объекта в массив
          this.formatNumberPhoneClientsList().push(updatedObj);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // addClient(data: IClients) {
  //   this.clientsListArray.mutate((val) => {
  //     val.push(data)
  //   })
  //   this._applicationsClientsService.selectClientsListArrayRequireNumberPhone.mutate(val => {
  //     val.push(data)
  //   })
  // }

  addClientsArray(data: IClients[]) {
    this.clientsListArray.set(data)
  }

  validatorsNumberPhone(EditForm: any, nativeElement: any) {
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
        this.clientsSelect.set(resData[0])
        return {dialogRef: true}
      } else {
        //Сохраняем отформатированный телефон
        this.formatPhone.set(formatStr)
        // Создаем телефон для показа
        this.viewFormatPhone.set(this.createFormatPhone(formatStr))
        nativeElement.focus()
      }
    }
    this.readOnly.set(false)
    return {dialogRef: false}
  }

  createFormatPhone(formatPhone: string) {
    if (formatPhone) {
      return '+7('
        + formatPhone.slice(0, 3)
        + ') '
        + formatPhone.slice(3, 6)
        + '-'
        + formatPhone.slice(6, 8)
        + '-' + formatPhone.slice(8)
    }
    return ''
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
}
