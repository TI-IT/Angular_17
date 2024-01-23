const express = require('express');
const dbConnect = require('../../services/dbConnect');
const router = express.Router();
const Applications = require('./applications_model');

// Getting all
router.get('/', async (req, res) => {
  await dbConnect();
  try {
    const applications = await Applications.find()
      .populate('_clientsId')
      .populate('_typesJobsId')
      .populate('_applicationSourceId')
      .limit(20)
      .sort('-applicationNumber');
    console.log(applications)
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting all
router.post('/clientsId', async (req, res) => {
  try {
    await dbConnect();
    const applications = await Applications.find({ _clientsId: req.body.id })
        .populate('_typesJobsId')
        .populate('_applicationSourceId')
        .sort('-applicationNumber');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting all
router.get('/numberLast', async (req, res) => {
  await dbConnect();
  try {
    const application = await Applications.findOne().sort('-applicationNumber').limit(1);
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', getApplications, (req, res) => {
  // res.json(res.subscriber)
});

// Creating one
router.post('/', async (req, res) => {
  await dbConnect();
  const applications = new Applications({
    applicationNumber: req.body.applicationNumber,
    _clientsId: req.body._clientsId,
    addressObject: req.body.addressObject,
    _applicationSourceId: req.body._applicationSourceId,
    _typesJobsId: req.body._typesJobsId,
    description: req.body.description,
  });
  try {
    const newApplications = await applications.save();
    res.status(201).json(newApplications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', getApplications, async (req, res) => {
  if (req.body.name != null) {
    res.applications.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.applications.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', getApplications, async (req, res) => {
  try {
    await res.subscriber.deleteOne();
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', getApplications, async (req, res) => {
  try {
    res.subscriber.applicationNumber = req.body.applicationNumber
    res.subscriber._clientsId = req.body._clientsId
    res.subscriber.addressObject = req.body.addressObject
    res.subscriber._applicationSourceId = req.body._applicationSourceId
    res.subscriber._typesJobsId = req.body._typesJobsId
    res.subscriber.description = req.body.description
    res.subscriber.createDate
    const newSubscriber = await res.subscriber.save()
    res.status(200).json(newSubscriber)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})

async function getApplications(req, res, next) {
  await dbConnect()
  let applications;
  try {
    applications = await Applications.findById(req.params.id);
    if (applications == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = applications;
  next();
}

module.exports = router;
