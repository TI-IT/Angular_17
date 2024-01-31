import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IOneSelectCategories, ISheetMaterials} from "../../../../../../typeScript/interfacesProducts";
import {GeneralService} from "../../../../../../services/global/generalService/general.service";
import {DialogAddOneCategoryComponent} from "../../dialog-add-one-category/dialog-add-one-category.component";

@Component({
  selector: 'app-add-sheet-materials',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, DialogAddOneCategoryComponent
  ],
  templateUrl: './add-sheet-materials.component.html',
  styleUrl: './add-sheet-materials.component.scss'
})
export class AddSheetMaterialsComponent {

  showModalDialogOneCategory =  this.generalService.showModalDialogOneCategory
  sheetMaterials: ISheetMaterials = {
    name: '',
    vendorCode: '',
    imageSrc: '',
    drawingImageSrc: '',
    price: 0,
    currency: 'руб.',
    description: '',
    unit: '',
    catalog: '',
    category: '',
    subcategories: '',
    thickness: 0,
    maxLength: 0,
    material: '',
    createDate: new Date(), // Initialize with a Date object
  }

  oneSelectedList!:IOneSelectCategories[]

  constructor(
    private generalService: GeneralService,
  ) {
  }

  onCreate(){

  }
  onCreateCategory(){
    this.showModalDialogOneCategory.update(value => value = true)
  }

}
