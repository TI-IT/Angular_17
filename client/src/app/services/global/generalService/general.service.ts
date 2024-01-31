import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public showModalDialog = signal(false)
  public isSidePanelVisible = signal(false)
  constructor() { }
}
