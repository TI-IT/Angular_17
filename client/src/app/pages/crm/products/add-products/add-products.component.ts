import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose, MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../../../../services/products.service";
import {ApiProductsService} from "../../../../services/api/api-products.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DialogOneService} from "../../../../services/dialog-one.service";
import {DialogOneCatalogsComponent} from "../../components/dialog-one-catalogs/dialog-one-catalogs.component";
import {IOneSelected} from "../../../../typeScript/interfaces";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatDialogModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatIcon,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent, MatOption, MatSelect
  ],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent implements OnInit {
  @ViewChild('input5') input5!: ElementRef;
  empForm!: FormGroup;
  catalog: any = '';
  nameCatalogArray: string[] = [
    'currency',
    'unit',
    'catalog',
    'categories',
    'subCategories',
    'materialThickness',
  ]
  productsSelect = this._productService.productsSelect;
  currencyNameList = this._dialogOneService.currencyNameList;
  unitNameList = this._dialogOneService.unitNameList;
  catalogNameList = this._dialogOneService.catalogNameList;
  categoriesNameList = this._dialogOneService.categoriesNameList;
  subCategoriesNameList = this._dialogOneService.subCategoriesNameList;
  materialThicknessNameList = this._dialogOneService.materialThicknessNameList;

  constructor(
    private _productService: ProductsService,
    private _fb: FormBuilder,
    private _apiService: ApiProductsService,
    private _dialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: GlobalSnackBarService,
    private _dialogOneService: DialogOneService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    this.nameCatalogArray.forEach(name=> {
      this.getAllCategories(name);
    })
    this.createEmpForm()
    if (this.data) {
      this.empForm.patchValue(this.data)
    }
  }

  //ловим Событие от выподающего списка
  onCatalogSelectionChange(event: Event) {
    // Handle the selected value change here
    this.catalog = event
  }

  createEmpForm() {
    this.empForm = this._fb.group({
      name: ['', Validators.required],
      vendorCode: ['', Validators.required],
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalEj8tnk7AywBgsPErBHh2_8vFwc2yZty-mqmzy3t6pP_lN3WnokkH8ghoeFPZ13cs3g&usqp=CAU',
      drawingImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalEj8tnk7AywBgsPErBHh2_8vFwc2yZty-mqmzy3t6pP_lN3WnokkH8ghoeFPZ13cs3g&usqp=CAU',
      price: 0,
      currency: '',
      description: '',
      unit: '',
      catalog: ['', Validators.required],
      categories: ['', Validators.required],
      subCategories: ['', Validators.required],
      materialThickness:'',
      dimensions: '',
      material: ['', Validators.required],
      color: ['', Validators.required],
      weight: '',
    })
  }

  //Получаем данные для выподающих списков
  getAllCategories(nameCatalog: string) {
    switch (nameCatalog) {
      case 'currency':
        this.currencyNameList.set(this.filterCatalog(nameCatalog));
        break;
      case 'unit':
        this.unitNameList.set(this.filterCatalog(nameCatalog));
        break;
      case 'catalog':
        this.catalogNameList.set(this.filterCatalog(nameCatalog));
        break;
      case 'categories':
        this.categoriesNameList.set(this.filterCatalog(nameCatalog));
        break;
      case 'subCategories':
        this.subCategoriesNameList.set(this.filterCatalog(nameCatalog));
        break;
      case 'materialThickness':
        this.materialThicknessNameList.set(this.filterCatalog(nameCatalog));
        break;
      default:
        //Здесь находятся инструкции, которые выполняются при отсутствии соответствующего значения
        //statements_def
        break;
    }
  }

  filterCatalog(nameCatalog: string) {
    const nameCatalogValue: string[] = [];
    this._apiService.getAll('oneSelected').subscribe((res) => {
      if (res.data.length > 0) {
        // Assuming res.data is an array
        const catalog: IOneSelected[] = res.data;
        // Filter by category and insert into currencyNameList
        const filterCatalog: IOneSelected[] = catalog.filter(obj => obj.nameCategory === nameCatalog);
        filterCatalog.forEach(nameCatalog => {
          nameCatalogValue.push(nameCatalog.value)
        });
      }
    });
    return nameCatalogValue
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._apiService
          .update(this.data._id, 'products', this.empForm.value)
          .subscribe({
            next: (val) => {
              this._snackBarService.openSnackBar('Обновление прошло успешно')
              this.productsSelect.set(val)
              this._dialogRef.close(true)
            },
            error: (err: any) => {
              console.error(err)
            },
          })
      } else {
        console.log(this.empForm.value)
        this._apiService.add('products', this.empForm.value).subscribe({
          next: (val: any) => {
            this._snackBarService.openSnackBar('Товар добавлен')
            this.productsSelect.set(val)
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
            this._snackBarService.openSnackBar(err.error.message)
          },
        })
      }
    }
  }

  openDialogOneForm(title: string, nameCategory: string, name: string) {
    this._dialogOneService.title.set(title);
    this._dialogOneService.nameCategory.set(nameCategory);
    this._dialogOneService.name.set(name);
    const dialogRef = this._dialog.open(DialogOneCatalogsComponent);
    dialogRef.afterClosed().subscribe(result => {
      //Обновляем список
      this.getAllCategories(nameCategory);
      // Обработайте результат здесь (если он есть)
      // Например, обновите данные на странице
    });
  }
}
