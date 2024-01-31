import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GeneralService} from "../../../../../services/global/generalService/general.service";

@Component({
  selector: 'app-add-sheet-materials',
  standalone: true,
    imports: [
        ReactiveFormsModule,FormsModule
    ],
  templateUrl: './add-sheet-materials.component.html',
  styleUrl: './add-sheet-materials.component.scss'
})
export class AddSheetMaterialsComponent {
  isSidePanelVisible = this.generalService.isSidePanelVisible
  sheetMaterials: any = {
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
    createDate: new Date(),
    thickness: 0,
    maxLength: 0,
    material: '',
  }

  categoryList:[] = []

  constructor(
    private generalService: GeneralService
  ) {
  }

  openAddCategoryForm(){

  }

  onCreate(){

  }
  closeSidePanel() {
    this.isSidePanelVisible.update(value => value = false)
  }
}
