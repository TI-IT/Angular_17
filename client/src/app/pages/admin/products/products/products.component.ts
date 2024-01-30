import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductApiService} from "../../../../services/apiServices/products/product-api.service";
import {ToastrService} from "ngx-toastr";
import {ModalDialogComponent} from "../../../../components/modalDialog/modalDialog.component";
import {GeneralService} from "../../../../services/global/generalService/general.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalDialogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  showDialog =  this.generalService.showModalDialog
  // Переменная для отображения
  isSidePanelVisible: boolean = false;
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

  sheetMaterialsSchema: any = {
    name: '',
    vendorCode: '',
    imageSrc: '',
    drawingImageSrc: '',
    price: 0,
    currency: '',
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

  categoryList: any[] = [];
  productList: any[] = [];
  sheetMaterials: any[] = [];

  constructor(
    private productSrv: ProductApiService,
    private toaster: ToastrService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit() {
    console.log()
    this.getAllCategory();
    this.getAllProducts();
    this.getAllSheetMaterials();
  }

  getAllCategory() {
    this.productSrv.getAllCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    })
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
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

}
