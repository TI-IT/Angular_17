import { Component } from '@angular/core';
import {GeneralService} from "../../../../../services/global/generalService/general.service";

@Component({
  selector: 'app-dialog-add-one-category',
  standalone: true,
    imports: [],
  templateUrl: './dialog-add-one-category.component.html',
  styleUrl: './dialog-add-one-category.component.scss'
})
export class DialogAddOneCategoryComponent {
  showModalDialogOneCategory = this.generalService.showModalDialogOneCategory

  constructor(
    private generalService: GeneralService,
  ) {
  }

  closeDialogForm() {
    this.showModalDialogOneCategory.update(value => value = false)
  }
}
