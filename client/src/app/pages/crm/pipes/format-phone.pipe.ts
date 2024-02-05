import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return '+7('
      + value.slice(0, 3)
      + ') '
      + value.slice(3, 6)
      + '-'
      + value.slice(6, 8)
      + '-' + value.slice(8);
  }
}

