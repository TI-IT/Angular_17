import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IOneSelectCategories, ISheetMaterials} from "../../../../../../typeScript/interfacesProducts";
import {GeneralService} from "../../../../../../services/global/generalService/general.service";
import {DialogAddOneCategoryComponent} from "../../dialog-add-one-category/dialog-add-one-category.component";
import {CategoriesService} from "../../../../../../services/apiServices/products/categories.service";
import {CategoryDataService} from "../../../../../../services/data/category-data.service";

@Component({
  selector: 'app-add-sheet-materials',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, DialogAddOneCategoryComponent
  ],
  templateUrl: './add-sheet-materials.component.html',
  styleUrl: './add-sheet-materials.component.scss'
})
export class AddSheetMaterialsComponent implements OnInit{

  showModalDialogOneCategory =  this.generalService.showModalDialogOneCategory
  categoryList = this.categoryListDataService.categoryList

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

  constructor(
    private generalService: GeneralService,
    private apiCategoriesService: CategoriesService,
    private categoryListDataService: CategoryDataService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getAllCategory()
  }
  getChildData(event: any){
    if(event){
    }
  }

  getAllCategory(){
    this.apiCategoriesService.getAllCategory().subscribe((res: any) => {
      this.categoryList.set(res.data);
      // this.cdr.detectChanges(); // Вызов detectChanges()
    })
  }

  onCreate(){

  }
  onCreateCategory(){
    this.showModalDialogOneCategory.update(value => value = true)
  }

}
