export interface IUser {
  _id?: string
  email: string,
  password: string,
  name?: string,
  role_id: string
}
export interface IRole {
  _id: string,
  roleName: string,
  __v?: number
}
export interface IOneSelected {
  _id?: string,
  nameCategory: string,
  name: string,
  value: string,
}

export interface ICreateApplications {
  _id?: string;
  _clientsId?: string;
  addressObject?: string;
  applicationNumber: number;
  createDate?: Date;
  description?: string;
  applicationSourceName: string;
  clientsName: string;
  email: string;
  numberPhone: string;
  typesJobsName: string;
}

export interface IApplications {
  applicationNumber: number;
  _clientsId: string;
  addressObject?: string;
  _applicationSourceId?: string;
  _typesJobsId?: string;
  description?: string;
  createDate?: Date;
}


export interface ICreateApplications {
  _id?: string;
  _clientsId?: string;
  addressObject?: string;
  applicationNumber: number;
  createDate?: Date;
  description?: string;
  applicationSourceName: string;
  clientsName: string;
  email: string;
  numberPhone: string;
  typesJobsName: string;
}

export interface IApplicationSource {
  applicationNumber: string;
  fullName: string;
  numberPhone: string;
}

export interface ITypesJobs {
  _id?: string;
  typesJobsName: string;
  description?: string;
  __v?: number;
}
export interface IJobTitle {
  _id?: string;
  jobTitleName: string;
  description?: string;
  __v?: number;
}
export interface IUnit {
  _id?: string;
  jobTitleName: string;
  description?: string;
  __v?: number;
}

export interface IApplicationSources {
  _id?: string;
  applicationSourceName: string;
  description?: string;
  __v?: number;
}

export interface IUpdateApplication {
  _id?: string;
  addressObject?: string;
  applicationNumber: number;
  createDate?: Date;
  description?: string;
  applicationSourceName: string;
  clientsName: string;
  email?: string;
  numberPhone: string;
  typesJobsName: string;
}

export interface ITableCrud {
  head: string,
  body: string
}
export interface IApiData {
  nameDb: string,
  item?: {}
}

export interface IDataList {
  _id: string,
  name: string,
}

export interface ICrudOneData {
  collectionNameUpdate: string,
  urlPostfix: string
  matLabel: string,
  dataList: IDataList[]
}

export interface IProducts {
  _id?: string;
  name: string;
  vendorCode: string;
  imageSrc: string;
  drawingImageSrc: string;
  price: 0;
  currency: string;
  description: string
  unit: string;
  catalog: string;
  categories: string;
  subCategories: string;
  materialThickness: string;
  dimensions: string;
  material: string;
  color: string;
  weight: string;
}

export interface ICategory {
  _id: string;
  name: string;
  imageSrc: string;
  createDate: string;
  categoryTypes_id: ICategoryType
}

export interface ICategoryType {
  _id: string;
  name: string;
  imageSrc: string;
  createDate: string;
}

export interface IOrder {
  clients: IClients
  numberApplications: string;
  typesJobsName: string;
  imageUrl: string,
  materials: any[];
  works: any[];
  services: any[];
}

export interface IOrders {
  numberApplications: string;
  materials: { imageUrl: string, products: IProductOrder[] }[];
  works: any;
  services: any;
}

export interface IProductOrder {
  position: number;
  name: string;
  quantity: number;
  unit: string;
  price: string;
  total: string;
}

export interface RequestWithFilterAndSort {
  filterModel: any;
  colId: any;
  sort: any;
  data: any;
}
export interface IUint {
  unitName: string;
  description: string;
}
export interface ICurrency {
  currencyName: string;
  description: string;
}

export interface IClients {
  _id?: string;
  clientsName: string;
  numberPhone: string;
  password?: string;
  email?: string;
  role?: string;
  description?: string;
  createDate?: Date;
  __v?: number;
}

