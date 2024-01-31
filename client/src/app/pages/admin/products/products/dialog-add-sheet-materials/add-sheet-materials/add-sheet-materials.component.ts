import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
  ) {
  }

  onCreate(){

  }
}
