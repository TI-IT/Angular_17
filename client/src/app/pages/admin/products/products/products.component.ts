import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductApiService} from "../../../../services/apiServices/products/product-api.service";
import {ToastrService} from "ngx-toastr";
import {GeneralService} from "../../../../services/global/generalService/general.service";
import {
  ModalDialogSelectedCategoryComponent
} from "../../../../components/modal-dialog-selected-category/modal-dialog-selected-category.component";
import {CategoryDataService} from "../../../../services/data/category-data.service";
import {IOneSelectCategories} from "../../../../typeScript/interfacesProducts";
import {DialogAddSheetMaterialsComponent} from "./dialog-add-sheet-materials/dialog-add-sheet-materials.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalDialogSelectedCategoryComponent, DialogAddSheetMaterialsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  showDialog =  this.generalService.showModalDialog
  categoryDataArray:IOneSelectCategories[] = this.categoryData.categoryList()
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  };

  categoryList: any[] = [];
  productList: any[] = [];
  sheetMaterials: any[] = [];

  constructor(
    private productSrv: ProductApiService,
    private toaster: ToastrService,
    private generalService: GeneralService,
    private categoryData: CategoryDataService,
  ) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllSheetMaterials();
  }

  getAllProducts() {
    this.productSrv.getAllProducts().subscribe((res: any) => {
      console.log('********************', res.data)
      this.productList = res.data;
    })
  }

  getAllSheetMaterials() {
    this.productSrv.getAllSheetMaterials().subscribe((res: any) => {
      console.log('********************', res.data)
      this.sheetMaterials = res.data;
    })
  }

  onSave() {
    this.productSrv.saveSheetMaterials(this.productObj).subscribe((res: any) => {
      if (res.result) {
        this.toaster.success("Товары получены", 'Server');
        this.getAllProducts()
      } else {
        this.toaster.error("Ошибка получения товаров", 'Server');
      }
    })
  }

  openAddClientForm() {
    console.log('++++++++++++++++++++')
    this.showDialog.update(value => value=true)
  }


  openSidePanel() {
    this.showDialog.update(value => value = true)
  }
}
