const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const SindicatProductDetailsLink = require('./sindicatProductDetailsLink_model')
const dbConnect = require('../../services/dbConnect')

const getHtml = async (url) => {
    const {data} = await axios.get(url)
    return cheerio.load(data)
}
const dropdownObjects = {}
const dropdownChildrensObjects = {}
const productsObjects = {}

const dropdownArrayUrl = []
const dropdownChildrensUrlArrayUrl = []
const productsObjectsArray = []

const parse = async () => {
    const dropdown = await getHtml('https://tcmo-pro.ru/')
// 1) сбор Категории оглавления в массив dropdownArray
    dropdown('.dropdown').each((i, element) => {
        const key = dropdown(element).find('.dropdown a[href]')
        const value = dropdown(element).find('.dropdown .hidden-xs').text()
        const keyAdd = key.attr('href')
        if (keyAdd && value) { // check if keyAdd is not empty
            dropdownObjects[keyAdd] = value
        }
    })
    const dropDownObjectsArray = Object.entries(dropdownObjects).map(([key, value]) => ({
        link: key,
        description: value
    }));

// 2) Сборка URL Главной категории  dropdownArrayUrl
    for (let i = 0; i < dropDownObjectsArray.length; i++) {
        const dropdownUrl = `https://tcmo-pro.ru${dropDownObjectsArray[i].link}`
        dropdownArrayUrl.push(dropdownUrl)
    }
    getParseProductDetailsUrl(dropdownArrayUrl)
}

// 3) Сборка URL отдельных Продуктов  createDropDownObjectsChildrensArray
const getParseProductDetailsUrl = async (dropdownArrayUrl) => {
    await dbConnect()
    for (let i = 0; i < dropdownArrayUrl.length; i++) {
        const dropdownUrl = await getHtml(`${dropdownArrayUrl[i]}`)
        await new Promise(resolve => setTimeout(resolve, 1000));
        // add 1 second delay
        dropdownUrl('.item').each((i, element) => {
            const key = dropdownUrl(element).find('.item .photo a[href]')
            const value = dropdownUrl(element).find('.link img[alt]')
            const imgBigSrc = dropdownUrl(element).find('.link img[src]')
            dropdownChildrensObjects[i] = {
                link: 'https://tcmo-pro.ru' + key.attr('href'),
                title: value.attr('alt'),
                imgBigSrc: 'https://tcmo-pro.ru' + imgBigSrc.attr('src')
            }
        })
        const createDropDownObjectsChildrensArray = Object.entries(dropdownChildrensObjects).map(([key, value]) => ({
            id: key,
            value
        }));
        // Сохраняем объекты в базу данных
        for (let i = 0; i < createDropDownObjectsChildrensArray.length; i++) {
            const obj = createDropDownObjectsChildrensArray[i].value;
            try {
                const sindicatProductDetailsLink = new SindicatProductDetailsLink({
                    link: obj.link,
                    lititlenk: obj.title,
                    imgBigSrc: obj.imgBigSrc
                })
                await sindicatProductDetailsLink.save()
            } catch (err) {
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    console.log(`Link ${obj.link} already exists, skipping`)
                } else {
                    console.error(err)
                }
            }
        }
    }
}

// 4) Сборка продуктов детально
const getParseProductDetails = async (createDropDownObjectsChildrensArray) => {

}
// Getting all
router.get('/sindicat_product_details_link', async (req, res) => {
    await dbConnect()
    const sindicatProductDetailsLink = await SindicatProductDetailsLink.find()
    if(sindicatProductDetailsLink.length === 0){
        await parse()
    }
    try {
        res.json(sindicatProductDetailsLink)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/products', async (req, res) => {
    await dbConnect()
    const sindicatProductDetailsLink = await SindicatProductDetailsLink.find()
    if(sindicatProductDetailsLink.length === 0){
        await parse()
    }
    try {
        res.json(sindicatProductDetailsLink)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/', async (req, res) => {
    try {
        await parse()
        res.json("message: ok")
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router