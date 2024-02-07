import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../../../services/global.service";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {
  private url = this._globalService.serverUrl()

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService,

  ) {
  }

  getAll(collectionDbName: string): Observable<{ message: string, data: [] }>{
    return this._http.get<{ message: string, data: [] }>(`${this.url}/api/${collectionDbName}`)
  }

  add(collectionDbName: string, data: object) {
    console.log(data)
    let addData = this._http.post(`${this.url}/api/${collectionDbName}`, data)
      .pipe(
        map(result => {
          // проверяем, что результат не является null или undefined
          if (!result) throw 'Ошибка при получении продуктов: нет данных'
          return result
        }),
        catchError(error => {
          // проверяем, что ошибка не является null или undefined
          if (!error) throw 'Ошибка запроса: неизвестная ошибка'
          // проверяем, что в ошибке есть детали
          if (!(error.error && error.error.message))
            throw 'Ошибка запроса: нет дополнительной информации'
          throw `Ошибка запроса: ${error.error.message}`
        }),
      )
    if (addData) {
      // console.log('add(collectionDbName: string, data: object) {===>>>',addData)
    }
    return addData
  }
}
