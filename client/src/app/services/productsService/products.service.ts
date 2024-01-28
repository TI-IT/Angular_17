import {ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiProductsService} from "../apiServices/products/apiProducts.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnDestroy{
  aSub!: Subscription;
  products!: any[]
  constructor(
    // private _api: ApiProductsService,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef,
  ) { }

  getAllProducts(){
    // this.aSub = this._api.getAll('products').subscribe({
    //   next: ({message, data}) => {
    //     this._toastr.success(message);
    //     this.products = data
    //     // Detect changes
    //     this._cdr.detectChanges();
    //   },
    //   error: (error) => {
    //     this._toastr.error(error.error.message);
    //   },
    // });
  }
  getFilterProducts(){

  }


  ngOnDestroy(): void {
    // Отписываемся от стрима
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    // Отключаем обнаружение изменений
    this._cdr.detach();
  }
}
