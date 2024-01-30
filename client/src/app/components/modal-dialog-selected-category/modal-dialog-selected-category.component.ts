import {Component, Input} from '@angular/core';
import {GeneralService} from "../../services/global/generalService/general.service";

@Component({
  selector: 'app-modal-dialog-selected-category',
  standalone: true,
  imports: [],
  templateUrl: './modal-dialog-selected-category.component.html',
  styleUrl: './modal-dialog-selected-category.component.scss'
})
export class ModalDialogSelectedCategoryComponent {
  @Input() headerText = '';
  @Input() contentText = '';
  showDialog = this.generalService.showModalDialog

  constructor(
    private generalService: GeneralService,
  ) {
  }

  closeDialogForm() {
    this.showDialog.update(value => value = false)
  }
}
