import {Injectable, signal} from '@angular/core';
import {IClients} from "../typeScript/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsClientsService {
  public viewFormatPhone = signal('')
  public formatPhone = signal('')
  //Найденный клиент по совпадению номера телефона
  selectClientsListArrayRequireNumberPhone = signal<IClients[]>([])
  readOnly= signal<boolean>(false)

  clientsSelect = signal<IClients>({
    clientsName: '',
    numberPhone: '',
  });
  constructor() { }
}
