import {Injectable, signal} from '@angular/core';
import {IProducts} from "../typeScript/interfaces";
import {Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsSelect = signal<IProducts>({
    name: '',
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
  });

  constructor() {
  }
}
