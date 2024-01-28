import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverUrl = signal<string>('')

  constructor(
  ) {
    this.createUrl()
  }

  createUrl() {
    const url = process.env['NODE_ENV'] === 'development' ? 'http://localhost:9001' : 'https://api.alumacom-crm.ru';
    this.serverUrl.set(url)
  }
}
