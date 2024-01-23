const mongoose = require('mongoose');

const dropdownMongooseObject = {
    dropdown: [
        {
            name: 'name',
            MongoType: 'String',
            MongoUnique: true,
            MongoRequire: true,
        },
    ],
};
const Data = {
    Users: {
        input: [
            {name: 'userName', title: 'Имя', type: 'text', MongoType: 'String', MongoUnique: true},
            {name: 'password', title: 'пароль', type: 'text', MongoType: 'String'},
            {name: 'email', title: 'Email', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {name: 'role', title: 'Роль', type: 'text', MongoType: 'String', MongoDefault: 'user'},
            {name: 'jobTitle', title: 'Должность', type: 'text', MongoType: 'String'},
        ],
    },
    Products: {
        input: [
            {
                name: 'id',
                title: 'Нумерация',
                type: 'text',
                MongoType: 'Number',
                MongoUnique: true,
                MongoRequire: true,
            },
            {name: 'article', title: 'Артикул', type: 'text', MongoType: 'String'},
            {name: 'productName', title: 'Наименование', type: 'text', MongoType: 'String'},
            {name: 'costPrice', title: 'Себестоимость', type: 'text', MongoType: 'Number'},
            {name: 'sellingPrice', title: 'Продажная цена', type: 'text', MongoType: 'Number'},
            {name: 'linkPhoto', title: 'Сылка на фото', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {name: 'typeProduct', title: 'Вид продукта', type: 'text', MongoType: 'String'},
            {name: 'catalog', title: 'Каталог товаров', type: 'text', MongoType: 'String'},
            {name: 'categoryProduct', title: 'Категория', type: 'text', MongoType: 'String'},
            {
                name: 'categoryChildrenProduct',
                title: 'Под категория',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'finishingProduct', title: 'Отделка', type: 'text', MongoType: 'String'},
            {name: 'supplierProduct', title: 'Поставщик', type: 'text', MongoType: 'String'},
            {name: 'unit', title: 'Ед. изм.', type: 'text', MongoType: 'String'},
            {name: 'markup', title: 'Наценка', type: 'number', MongoType: 'String'},
        ],
    },
    Clients: {
        input: [
            {
                name: 'id',
                title: 'Нумерация',
                type: 'text',
                MongoType: 'Number',
                MongoUnique: true,
                MongoRequire: true,
            },
            {name: 'surname', title: 'Фамилия', type: 'text', MongoType: 'String'},
            {name: 'name', title: 'Имя', type: 'text', MongoType: 'String'},
            {name: 'patronymic', title: 'Отчество', type: 'text', MongoType: 'String'},
            {name: 'phone', title: 'Телефон', type: 'text', MongoType: 'Number', MongoUnique: true},
            {
                name: 'email',
                title: 'Email',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'address', title: 'Адрес проживания', type: 'text', MongoType: 'String'},
            {name: 'notes', title: 'Примечания', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {
                name: 'analyticAddress',
                title: 'Откуда о нас узнали?',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'organizations', title: 'Организация', type: 'text', MongoType: 'String'},
            {name: 'city', title: 'Город', type: 'text', MongoType: 'String'},
        ],
    },
    Offer: {
        input: [
            {name: 'surname', title: 'Фамилия', type: 'text', MongoType: 'String'},
            {name: 'name', title: 'Имя', type: 'text', MongoType: 'String'},
            {name: 'patronymic', title: 'Отчество', type: 'text', MongoType: 'String'},
            {name: 'phone', title: 'Телефон', type: 'text', MongoType: 'Number', MongoUnique: true},
            {
                name: 'email',
                title: 'Email',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'address', title: 'Адрес проживания', type: 'text', MongoType: 'String'},
            {name: 'notes', title: 'Примечания', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {
                name: 'catalog',
                title: 'Каталог товаров',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'categoryProduct', title: 'Категория', type: 'text', MongoType: 'String'},
        ],
    },
    Tree: {
        input: [
            {name: 'surname', title: 'Фамилия', type: 'text', MongoType: 'String'},
            {name: 'name', title: 'Имя', type: 'text', MongoType: 'String'},
            {name: 'patronymic', title: 'Отчество', type: 'text', MongoType: 'String'},
            {name: 'phone', title: 'Телефон', type: 'text', MongoType: 'Number', MongoUnique: true},
            {
                name: 'email',
                title: 'Email',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'address', title: 'Адрес проживания', type: 'text', MongoType: 'String'},
            {name: 'notes', title: 'Примечания', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {
                name: 'catalog',
                title: 'Каталог товаров',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'categoryProduct', title: 'Категория', type: 'text', MongoType: 'String'},
        ],
    },
    // Заполнить
    Orders: {
        input: [
            {name: 'surname', title: 'Фамилия', type: 'text', MongoType: 'String'},
            {name: 'name', title: 'Имя', type: 'text', MongoType: 'String'},
            {name: 'patronymic', title: 'Отчество', type: 'text', MongoType: 'String'},
            {name: 'phone', title: 'Телефон', type: 'text', MongoType: 'Number', MongoUnique: true},
            {
                name: 'email',
                title: 'Email',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'address', title: 'Адрес проживания', type: 'text', MongoType: 'String'},
            {name: 'notes', title: 'Примечания', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {
                name: 'catalog',
                title: 'Каталог товаров',
                type: 'text',
                MongoType: 'String',
            },
            {name: 'categoryProduct', title: 'Категория', type: 'text', MongoType: 'String'},
        ],
    },
    // Заявки Заполнить
    Applications: {
        input: [
            {name: 'surname', title: 'Фамилия', type: 'text', MongoType: 'String'},
            // author: { type: Schema.Types.ObjectId, ref: 'User' }
            {name: 'client', title: 'Имя', type: 'text', MongoType: 'String'},
            {name: 'patronymic', title: 'Отчество', type: 'text', MongoType: 'String'},
            {name: 'phone', title: 'Телефон', type: 'text', MongoType: 'Number', MongoUnique: true},
            {name: 'email', title: 'Email', type: 'text', MongoType: 'String',},
            {name: 'address', title: 'Адрес проживания', type: 'text', MongoType: 'String'},
            {name: 'notes', title: 'Примечания', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {name: 'catalog', title: 'Каталог товаров', type: 'text', MongoType: 'String',},
            {name: 'categoryProduct', title: 'Категория', type: 'text', MongoType: 'String'},
        ],
    }, // Заявки Заполнить
    Test1: {
        input: [
            // запрос на объеденение
            {name: 'testName', title: 'testTitle1', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
            {name: '_authorId', title: 'testTitle', type: 'text', MongoType: mongoose.Schema.Types.ObjectId, MongoRef: 'test2'},
        ],
    }, // Заявки Заполнить
    Test2: {
        input: [
            // запрос на объеденение
            {name: 'name', title: 'testTitle2', type: 'text', MongoType: 'String'},
        ],
        dropdown: [
        ],
    },
    // Город
    Citys: dropdownMongooseObject,
    // Вид продукта
    TypeProduct: dropdownMongooseObject,
    // Категория
    CategoryProduct: dropdownMongooseObject,
    // Под категория
    CategoryChildrenProduct: dropdownMongooseObject,
    // Отделка
    FinishingProduct: dropdownMongooseObject,
    // Поставщик
    SupplierProduct: dropdownMongooseObject,
    //Ед. изм.
    Unit: dropdownMongooseObject,
    // Наценка
    Markup: dropdownMongooseObject,
    // Каталог
    Catalog: dropdownMongooseObject,
    // Вид сделки
    TypeTransaction: dropdownMongooseObject,
};

const ModelData = (nameModel) => {
    const ModelsObject = {};
    if (Data[nameModel]) {
        Data[nameModel].input?.map((obj) => {
            const createObj = {};
            if (obj['MongoType']) {
                Object.assign(createObj, {
                    type: obj.MongoType,
                });
            }
            if (obj['MongoUnique']) {
                Object.assign(createObj, {
                    unique: obj.MongoUnique,
                });
            }
            if (obj['MongoRequire']) {
                Object.assign(createObj, {
                    require: obj.MongoRequire,
                });
            }
            if (obj['MongoDefault']) {
                Object.assign(createObj, {
                    default: obj.MongoDefault,
                });
            }
            Object.assign(ModelsObject, {[obj.name]: createObj});
        });
        Data[nameModel].dropdown?.map((obj) => {
            const createObj = {};
            if (obj['MongoType']) {
                Object.assign(createObj, {
                    type: obj.MongoType,
                });
            }
            if (obj['MongoRef']) {
                Object.assign(createObj, {
                    ref: obj.MongoRef,
                });
            }
            if (obj['MongoUnique']) {
                Object.assign(createObj, {
                    unique: obj.MongoUnique,
                });
            }
            if (obj['MongoRequire']) {
                Object.assign(createObj, {
                    require: obj.MongoRequire,
                });
            }
            if (obj['MongoDefault']) {
                Object.assign(createObj, {
                    default: obj.MongoDefault,
                });
            }
            Object.assign(ModelsObject, {[obj.name]: createObj});
        });
    } else {
        console.log('Ошибка в Data Название Объекта не существует!');
        return;
    }
    return ModelsObject;
};

module.exports = {
    Data,
    ModelData,
};
