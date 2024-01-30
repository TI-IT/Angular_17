const express = require('express');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')
const session = require("express-session");
const passport = require('passport')
const app = express();

require('dotenv').config()

app.use(require('morgan')(':method :url :status :response-time ms'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(
    require('cors')({
        credentials: true,
        origin: [
            'https://alumacom-crm.ru',
            'http://localhost:3000',
            'http://localhost:9001',
            'http://127.0.0.1:3000',
            'https://api.alumacom-crm.ru',
            'http://localhost:4200',
            'https://yougile.com',

        ],
    }),
);

//Для добавления файла (дает доступ на прямую к папке)
app.use('/uploads', express.static('uploads'))

app.use(express.json());

// MONGODB
let mongoUrl
if (process.env['NODE_ENV'] === "development ") {
    mongoUrl = process.env.MONGO_DEV_URL
} else {
    mongoUrl = process.env.MONGO_PRODUCTION_URL
}

app.use(session({
    secret: process.env.MONGO_DEV_SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        ttl: 30 * 24 * 60 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
}));

app.use(passport.initialize())
require('./middleware/passport')(passport)

// ROUTES
const authRouter = require('./app_modules/auth/auth_route');
const roleRouter = require('./app_modules/role/role-route');

const applicationSourceRouter = require('./app_modules/applications/applicationSource/applicationSource_route');
const job_titleRouter = require('./app_modules/jobTitles/job_title_route');
const usersRouter = require('./app_modules/users/users_route');
const productsRouter = require('./app_modules/products/products_router');
const sheetMaterialsRouter = require('./app_modules/CatalogsProducts/SheetMaterials/sheetMaterials_router');
const unitsRouter = require('./app_modules/unit/unit_router');
const oneSelectedRouter = require('./app_modules/oneSelectedList/oneSelected_router');
const currencyRouter = require('./app_modules/currency/currency_router');
const applicationsRouter = require('./app_modules/applications/applications_route');
const typesJobsRouter = require('./app_modules/applications/types_jobs_route');
const clientsRouter = require('./app_modules/clients/clients_route');
const scrapingRouter = require('./app_modules/scraping/sindicat_scraping_route');
const analyticsRouter = require('./app_modules/analytics/analytics_route');
const categoryRouter = require('./app_modules/category/category_route');
const categoryTypesRouter = require('./app_modules/categoryTypes/categoryTypes_route');
const orderRouter = require('./app_modules/order/order_router');
const positionRouter = require('./app_modules/position/position_route');
const formatRouter = require('./app_modules/format/format-route');

app.use('/api/auth', authRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', usersRouter);

app.use('/api/products', productsRouter);
app.use('/api/sheetMaterials', sheetMaterialsRouter);
app.use('/api/units', unitsRouter);
app.use('/api/oneSelected', oneSelectedRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/applicationSource', applicationSourceRouter);
app.use('/api/types_jobs', typesJobsRouter);
// app.use('/api/job_titles', job_titleRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/scraping', scrapingRouter);

app.use('/api/analytics', analyticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/categoryTypes', categoryTypesRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);
app.use('/api/format', formatRouter);

// обработка маршрутов Angular

module.exports = app