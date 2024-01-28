import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {SuccessBtnComponent} from "../../../../components/buttons/success-btn/success-btn.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SuccessBtnComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  // Переменная для отображения
  isSidePanelVisible: boolean = false;
  btnBoolean =  false

  openSidePanel(){
    this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible = false;
  }
  getSuccessBtnData(event: any){
    this.btnBoolean = event
  }

}
