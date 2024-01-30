import {Injectable, OnInit, signal} from '@angular/core';
import {CategoriesService} from "../apiServices/products/categories.service";
import {IOneSelectCategories} from "../../typeScript/interfacesProducts";

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService implements OnInit{
  public categoryList = signal<IOneSelectCategories[]>([])
  constructor(
    private apiCategoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory(){
    this.apiCategoriesService.getAllCategory().subscribe((res: any) => {
      this.categoryList = res.data.data;
    })
  }

  createCategory(obj:IOneSelectCategories){
    this.apiCategoriesService.createCategory(obj).subscribe((res: any) => {
      console.log('createCategory', res.data)
      this.categoryList.update(value => value = res.data.data);
    })
  }

}
