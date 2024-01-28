import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {SheetMaterialsComponent} from "./sheet-materials/sheet-materials.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SheetMaterialsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // Переменная для отображения
  isSidePanelVisible: boolean = false;

  constructor(

  ) {
  }

  openSidePanel(){
    this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible = false;
  }

}
