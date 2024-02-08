import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  private _serverUrl = this._globalService.serverUrl()
  public formatPhone = signal('')

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService,
  ) {
  }

  getAll(collectionDbName: string) {
    return this._http.get<any>(`${this._serverUrl}/api/${collectionDbName}`)
  }

  getAllById(collectionDbName: string, data: object) {
    return this._http.post(`${this._serverUrl}/api/${collectionDbName}`, data)
  }

  //готовое
  add(collectionDbName: string, data: object) {
    return this._http.post(`${this._serverUrl}/api/${collectionDbName}`, data)
  }

  update(id: string, collectionDbName: string, data: any) {
    return this._http.put<any>(`${this._serverUrl}/api/${collectionDbName}/${id}`, data)
  }

  delete(id: string, collectionDbName: string) {
    return this._http.delete<any>(`${this._serverUrl}/api/${collectionDbName}/${id}`)
  }
}
