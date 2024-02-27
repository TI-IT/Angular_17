import {Injectable, signal} from '@angular/core';
import {IProducts} from "../typeScript/interfaces";

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
    subCategories: '',
    materialThickness: '',
  });

  constructor() {
  }
}
