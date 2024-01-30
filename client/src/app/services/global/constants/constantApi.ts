export const ConstantApi = {
  API_SERVER: process.env['NODE_ENV'] === 'development' ? 'http://localhost:9001/api/' : 'https://api.alumacom-crm.ru/',
  METHODS: {
    GET_ALL_PRODUCT: 'products',

    GET_ALL_ONE_SELECTED: 'oneSelected',
    GET_ALL_SHEET_MATERIALS: 'sheetMaterials',
    CREATE_MATERIALS: 'sheetMaterials',

    GET_ALL_CATEGORY: 'GetAllCategory',
    CREATE_PRODUCT: 'CreateProduct',
  },
}
