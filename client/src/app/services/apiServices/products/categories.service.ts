import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantApi} from "../../global/constants/constantApi";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private http: HttpClient
  ) { }

  getAllCategory(){
    return this.http.get(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_ONE_SELECTED);
  };

  createCategory(obj: any){
    return this.http.post(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_ONE_SELECTED, obj)
  };

  updateCategory(obj: any){
    return this.http.post(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_ONE_SELECTED, obj)
  };

  deleteCategory(obj: any){
    return this.http.post(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_ONE_SELECTED, obj)
  };


}
