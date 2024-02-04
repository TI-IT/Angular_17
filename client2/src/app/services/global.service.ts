import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public serverUrl = signal<string>('')

  constructor(
    private _http: HttpClient,
  ) {
    this.createUrl()
  }

  createUrl() {
    const url = process.env['NODE_ENV'] === 'development' ? 'http://localhost:9001' : 'https://api.alumacom-crm.ru';
    this.serverUrl.set(url)
  }
}
