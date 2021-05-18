const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()

const dayController = require('../controllers/day')

const {validateParam, validateBody,schemas} = require('../helpers/routerHelpers')

router.route('/')
    .post(dayController.insertDay)


module.exports = router