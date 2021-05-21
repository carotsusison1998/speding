const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()

const spendingController = require('../controllers/spending')

const {validateParam, validateBody,schemas} = require('../helpers/routerHelpers')

router.route('/')
    .post(spendingController.insertSpending)


module.exports = router