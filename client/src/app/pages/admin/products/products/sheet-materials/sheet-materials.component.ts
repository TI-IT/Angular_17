import {Component, inject, OnInit} from '@angular/core';
import {IProduct, ISheetMaterials} from "../../../../../typeScript/interfacesProducts";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sheet-materials',
  standalone: true,
  imports: [],
  templateUrl: './sheet-materials.component.html',
  styleUrl: './sheet-materials.component.scss'
})
export class SheetMaterialsComponent implements OnInit{
  sheetMaterials!: ISheetMaterials[]
  products!: any
  constructor(
     private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
     // this.products = this._products.getAllProducts();
        console.log(this.products)
    }
  // iconClasses = {
  //   error: 'toast-error',
  //   info: 'toast-info',
  //   success: 'toast-success',
  //   warning: 'toast-warning',
  // };

    onClick(){
      this.toaster.success("Вы вошли", 'Success');
      this.toaster.info("Вы вошли", 'Info');
      this.toaster.error("Вы вошли", 'Error');
      this.toaster.warning("Вы вошли", 'Warning');
    }
}
