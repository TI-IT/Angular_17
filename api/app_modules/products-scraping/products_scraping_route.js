// const express = require('express')
// const router = express.Router()
// const axios = require('axios')
// const cheerio = require('cheerio')
// const Products = require('../products/products_model')
// const dbConnect = require("../../services/dbConnect");
// const SindicatProductDetailsLink = require("../scraping/sindicatProductDetailsLink_model");
//
// const getHtml = async (url) => {
//     const {data} = await axios.get(url)
//     return cheerio.load(data, null, false)
// }
// const charsObjectsArray = [];
// const dropdownChildrensObjects = {}
// const productsObjects = {}
//
// const dropdownArrayUrl = []
// const dropdownChildrensUrlArrayUrl = []
// const productsObjectsArray = []
//
// const parse = async () => {
//     await dbConnect();
//     const id = "64a93f8cbe39622f02689641";
//     const url = await SindicatProductDetailsLink.findById(id);
//
//     const $url = await getHtml(url.link);
//
//     $url('.info').each((i, element) => {
//         const nameProduct = $url(element).find('h1').text();
//         console.log(nameProduct);
//     });
//
//
//     const count = $url('.docs a[href]');
//     console.log(count.attr('href'));
//
//
//     const charsObjectsArray = [];
//     // сбор Категории оглавления в массив dropdownArray
//     $url('.chars').each((i, element) => {
//         const valueElements = $url(element).find('td:nth-child(2)');
//         if (valueElements.length > 0) {
//             valueElements.each((j, valueElement) => {
//                 const titleElement = $url(valueElement).prev('td');
//
//                 const title = titleElement.text().trim();
//                 const value = $url(valueElement).text().trim();
//                 const valueArray = value.split(/\t+/).filter(val => val.trim() !== '');
//
//                 const length = Math.min(title.split(/\s+/).length, valueArray.length);
//                 const charsObjects = valueArray.map((val, index) => ({
//                     title: index < length ? title : '',
//                     value: val.trim()
//                 }));
//                 charsObjectsArray.push(...charsObjects);
//             });
//         }
//     });
//     console.log(charsObjectsArray)
//
// };
//
//
// // Getting all
// router.get('/', async (req, res) => {
//     const response = await parse()
//     try {
//         res.json(response)
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// })
//
// module.exports = router