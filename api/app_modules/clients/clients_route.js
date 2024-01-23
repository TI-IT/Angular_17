const express = require('express')
const router = express.Router()
const passport = require('passport')
const Clients = require('./clients_model')
const dbConnect = require('../../services/dbConnect')

// Getting all
router.get('/', async (req, res) => {
    await dbConnect()
    try {
        const clients = await Clients.find({})
        res.json({
            message: 'Клиенты получены',
            data: clients
        });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при получении данных: " + err.message }); // Пример обработки ошибок
    }
})
// Getting One
router.get('/:id', getClients, (req, res) => {
    res.json(res.clients)
})

// Creating one
router.post('/', async (req, res) => {
    await dbConnect()

    const clients = new Clients({
        clientsName: req.body.clientsName,
        numberPhone: req.body.numberPhone,
        email: req.body.email,
        description: req.body.description,
        password: req.body?.password,
        role: req.body?.role,
    })
    try {
        const newClients = await clients.save()
        res.status(201).json(newClients)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Updating One


// Deleting One
router.delete('/:id', getClients, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', getClients, async (req, res) => {
    try {
        res.subscriber.clientsName = req.body.clientsName
        res.subscriber.numberPhone = req.body.numberPhone
        res.subscriber.email = req.body.email
        res.subscriber.description = req.body.description
        res.subscriber.password = req.body.password
        res.subscriber.role = req.body.role
        const newSubscriber = await res.subscriber.save()
        res.status(200).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

async function getClients(req, res, next) {
    await dbConnect()
    let clients
    try {
        clients = await Clients.findById(req.params.id)
        if (clients == null) {
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.subscriber = clients
    next()
}

module.exports = router