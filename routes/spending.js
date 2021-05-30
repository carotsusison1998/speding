const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()

const spendingController = require('../controllers/spending')

const {validateParam, validateBody,schemas} = require('../helpers/helperSpending')

router.route('/')
    .post(validateBody(schemas.validateSpending), spendingController.insertSpending)
    .put(validateBody(schemas.validateUpdateSpending),spendingController.updateSpending)

router.route('/get-detail')
    .post(spendingController.detailSpending)
module.exports = router