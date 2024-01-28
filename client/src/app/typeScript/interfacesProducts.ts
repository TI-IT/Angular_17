import {fdatasync} from "node:fs";

export interface ICatalog {

}
export interface ISheetMaterials{
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
  subcategories: string;
  createDate: string;
  thickness: number;
  maxLength: number;
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
