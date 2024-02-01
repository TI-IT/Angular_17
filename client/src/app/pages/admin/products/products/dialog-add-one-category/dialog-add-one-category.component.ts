import {Component, Input, EventEmitter, Output} from '@angular/core';
import {GeneralService} from "../../../../../services/global/generalService/general.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IOneSelectCategories} from "../../../../../typeScript/interfacesProducts";
import {CategoriesService} from "../../../../../services/apiServices/products/categories.service";
import {ToastrService} from "ngx-toastr";
import {CategoryDataService} from "../../../../../services/data/category-data.service";

@Component({
  selector: 'app-dialog-add-one-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-one-category.component.html',
  styleUrl: './dialog-add-one-category.component.scss'
})
export class DialogAddOneCategoryComponent {
  @Input() name = '';
  @Input() nameCategory = '';
  @Output() emitChildData = new EventEmitter();
  showModalDialogOneCategory = this.generalService.showModalDialogOneCategory
  categoryList = this.categoryListDataService.categoryList
  inputData!: IOneSelectCategories
  inputValue= ''
  resData = {}
  constructor(
    private generalService: GeneralService,
    private apiCategoriesService: CategoriesService,
    private toaster: ToastrService,
    private categoryListDataService: CategoryDataService,
  ) {
  }

  onSave(){
    if(this.inputValue){
      this.inputData = {
        nameCategory: this.nameCategory,
        name: this.name,
        value: this.inputValue,
      }
      this.apiCategoriesService.createCategory(this.inputData).subscribe((res: any) =>{
        this.categoryList.update((value) => {
          value.push(res.data);
          return value;
        });
      })
      this.showModalDialogOneCategory.update(value => value = false)
    } else {
      this.toaster.error("Заполните поле", 'Валидация');
    }
  }

  closeDialogForm() {
    this.showModalDialogOneCategory.update(value => value = false)
  }
}
