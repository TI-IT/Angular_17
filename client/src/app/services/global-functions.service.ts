import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor() { }

  createFormatPhone(formatPhone: string) {
    if (formatPhone) {
      return '+7('
        + formatPhone.slice(0, 3)
        + ') '
        + formatPhone.slice(3, 6)
        + '-'
        + formatPhone.slice(6, 8)
        + '-' + formatPhone.slice(8);
    }
    return ''
  }

  filterKeys(object: any, excludedKeys: string[]): any {
    return Object.keys(object)
      .filter(key => !excludedKeys.includes(key))
      .reduce((obj: any, key: string) => {
        obj[key] = object[key];
        return obj;
      }, {});
  }
}
