import {Component, Input} from '@angular/core';
import {GeneralService} from "../../services/global/generalService/general.service";

@Component({
  selector: 'app-modalDialog',
  standalone: true,
  imports: [],
  templateUrl: './modalDialog.component.html',
  styleUrl: './modalDialog.component.scss'
})
export class ModalDialogComponent {
  @Input() headerText = '';
  @Input() contentText = '';
  showDialog =  this.generalService.showModalDialog
  constructor(
    private generalService: GeneralService,
  ) {
  }

  closeDialogForm(){
    this.showDialog.update(value => value=false)
  }
}
