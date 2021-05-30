const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()

const dayController = require('../controllers/day')

const {validateParam, validateBody, schemas} = require('../helpers/routerHelpers')

router.route('/')
    .get(dayController.getDay)
    .post(dayController.insertDay)
router.route('/get-day')
    .post(dayController.getSpendingOfDay)


module.exports = router