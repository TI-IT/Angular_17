const express = require('express')
const dbConnect = require('../../services/dbConnect')
const router = express.Router()
const JobTitle = require('./job_title_model')

// Getting all
router.get('/', async (req, res) => {
    await dbConnect()
    try {
        const jobTitle = await JobTitle.find()
        res.json({
            message: '',
            data: jobTitle
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting One
router.get('/:id', getJobTitle, (req, res) => {
    res.json(res.jobTitle)
})

// Creating one
router.post('/', async (req, res) => {
    await dbConnect()
    const jobTitle = new JobTitle({
        jobTitleName: req.body.jobTitleName
    })
    try {
        const newJobTitle = await jobTitle.save()
        res.status(201).json(newJobTitle)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.post('/byId', async (req, res) => {
    try {
        await dbConnect();
        const jobTitle = await JobTitle.findOne({ _id: req.body.id });
        if (jobTitle) {
            res.status(200).json({ ok: true, data: jobTitle });
        } else {
            res.status(404).json({ ok: false, message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ ok: false, message: err.message });
    }
});

// Updating One
router.patch('/:id', getJobTitle, async (req, res) => {
    if (req.body.name != null) {
        res.jobTitle.jobTitleName = req.body.jobTitleName
    }
    if (req.body.jobTitleName != null) {
        res.jobTitle.jobTitleName = req.body.jobTitleName
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting One
router.delete('/:id', getJobTitle, async (req, res) => {

    try {
        await res.jobTitle.deleteOne()
        res.json({message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getJobTitle(req, res, next) {
    await dbConnect()
    let jobTitle
    try {
        jobTitle = await JobTitle.findById(req.params.id)
        if (jobTitle == null) {
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.jobTitle = jobTitle
    next()
}

module.exports = router