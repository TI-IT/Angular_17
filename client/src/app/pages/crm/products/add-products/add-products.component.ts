import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
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

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatDialogModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatIcon,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent implements OnInit {
  @ViewChild('input5') input5!: ElementRef;
  empForm!: FormGroup

  productsSelect = this._productService.productsSelect

  constructor(
    private _productService: ProductsService,
    private _fb: FormBuilder,
    private _apiService: ApiProductsService,
    private _dialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: GlobalSnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.createEmpForm()
    if (this.data) {
      this.empForm.patchValue(this.data)
    }
  }

  createEmpForm() {
    this.empForm = this._fb.group({
      name: ['', Validators.required],
      vendorCode: '',
      imageSrc: '',
      drawingImageSrc: '',
      price: 0,
      currency: '',
      description: '',
      unit: '',
      catalog: '',
      categories: '',
      Subcategories: '',
    })
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
}
