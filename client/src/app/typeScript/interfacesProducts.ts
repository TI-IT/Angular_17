import {fdatasync} from "node:fs";

export interface ICatalog {

}
export interface IOneSelectCategories {
  _id?: string;
  nameCategory: string;
  name: string;
  value: string;
}

export interface ISheetMaterials{
  _id?: string;
  name: string;
  vendorCode: string;
  imageSrc: string;
  drawingImageSrc: string;
  price: number;
  currency: string;
  description: string;
  unit: string;
  catalog: string;
  category: string;
  subcategories: string;
  createDate: Date;
  thickness: number;
  maxLength: number;
  material: string;
}

export interface IProduct {
  _id: string;
  name: string;
  vendorCode: string;
  imageSrc: string;
  drawingImageSrc: string;
  price: number;
  currency: string;
  description: string;
  unit: string;
  catalog: string;
  category: string;
  Subcategories: string;
  createDate: string;
}

export interface IUint {
  name: string;
}
