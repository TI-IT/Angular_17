import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantApi} from "../../global/constants/constantApi";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(
    private http: HttpClient
  ) { };

  getAllProducts(){
    return this.http.get(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_PRODUCT);
  };
  getAllSheetMaterials(){
    return this.http.get(ConstantApi.API_SERVER + ConstantApi.METHODS.GET_ALL_SHEET_MATERIALS);
  };
  saveSheetMaterials(obj: any){
    return this.http.post(ConstantApi.API_SERVER + ConstantApi.METHODS.CREATE_MATERIALS, obj);
  };
  saveProduct(obj: any){
    return this.http.post(ConstantApi.API_SERVER + ConstantApi.METHODS.CREATE_PRODUCT, obj)
  };
}
