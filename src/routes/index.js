const express = require('express');
const router = express.Router();

let branchController = require('../controllers/branchController');
let onDemandController = require('../controllers/onDemandController');

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'API Node.js + PostgreSQL!',
    version: '1.0.0',
  });
});

router.post('/api/login', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'login',
    version: '1.0.0',
  });
});

router.post('/api/logout', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'logout',
    version: '1.0.0',
  });
});

//branchlist//
router.get('/api/branchList', branchController.branchList);

/*
 * branch: getAll, findById, searchFilter
 * onDemand: 
*/

router.get('/api/branches', branchController.getAll)
.post('/api/branches', branchController.searchFilter);

router.post('/api/branches/list', branchController.findById);

/*
 * onDemand: getAll, findById, insertOne, updated, removed
 * onDemand: 
*/

//onDemand List//
router.get('/api/onDemand', onDemandController.getAll)
.post('/api/onDemand', onDemandController.findById);

//onDemand add//
/*
 * params: bid, capacity, price, day, start_time, end_time
*/
router.post('/api/onDemand/add', onDemandController.insertOne);

//onDemand edit//
/*
 * params: id, bid, capacity, price, day, start_time, end_time
*/
router.post('/api/onDemand/edit', onDemandController.updated);

//onDemand remove//
/*
 * params: id
*/
router.post('/api/onDemand/remove', onDemandController.removed);

module.exports = router;