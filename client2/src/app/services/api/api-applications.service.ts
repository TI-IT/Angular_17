import {Injectable, signal} from '@angular/core';
import {IApplications, IApplicationSource} from "../../typeScript/interfaces";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {catchError, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiApplicationsService {
  private serverUrl = this._globalService.serverUrl()

  public applicationSource = signal<IApplicationSource[]>([]);

  // public applications = toSignal<IApplications[]>(this.http.get<IApplications[]>('https://fakestoreapi.com/products'));


  constructor(
    private http: HttpClient,
    private router: Router,
    private _globalService: GlobalService,
  ) {
  }


// get(): Observable<Products[]> {
//   return this.http.get<Products[]>('http://localhost:9001/products');
// }

  get(collectionDbName: string, data: object){
    let getAllData = this.http.get<IApplications[]>(`${this.serverUrl}/api/${collectionDbName}`, data)
      .pipe(
        map(result => {
          console.log(result)
          // проверяем, что результат не является null или undefined
          // if (!result) throw 'Ошибка при получении продуктов: нет данных'
          // return result?.data
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
    if(getAllData){
      console.log(getAllData)
    }
    return getAllData
  }

  //готовое
  getAllById(id: string, collectionDbName: string) {
    return this.http.get<any>(`${this.serverUrl}/api/${collectionDbName}/${id}`)
  }
  update(id: string, collectionDbName: string, data: any){
    return this.http.put<any>(`${this.serverUrl}/api/${collectionDbName}/${id}`, data)
  }

  delete(id: string, collectionDbName: string ) {
    return this.http.delete<any>(`${this.serverUrl}/api/${collectionDbName}/${id}`)
  }

  //готовое
  getAll(collectionDbName: string) {
    return this.http.get<any>(`${this.serverUrl}/api/${collectionDbName}`)
  }

  //готовое
  add(collectionDbName: string, data: object) {
    return this.http.post(`${this.serverUrl}/api/${collectionDbName}`, data)
  }
}
