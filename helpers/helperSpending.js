const joi = require('joi')
const { schema } = require('../models/Spending')

const validateParam = (schema, name) => {
    return (req, res, next) => {
        // console.log('params...', req.params[name])
        const validatorResult = schema.validate({ param: req.params[name] })
        // console.log('asdasda',validatorResult)
        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }
        else{
            // console.log('1', req.value)
            if(!req.value) req.value = {}
            // console.log('2', req.value.params)
            if(!req.value['params']) req.value.params = {}
            // console.log('3', req.value)
            req.value.params[name] = req.params[name]
            // console.log('4', req.value)

            next()
        }
    }
}

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)
        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }
        else{
            if(!req.value) req.value = {}
            if(!req.value['body']) req.value.body = {}
            req.value.body = validatorResult.value
            next()
        }
    }
}

const schemas = {
    validateSpending: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        date: joi.required(),
        id_user: joi.string(),
        note: joi.string().required()
    }),
    validateUpdateSpending: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        _id: joi.string().required(),
        note: joi.string().required()
    }),
    validateDeleteSpending: joi.object().keys({
        _id: joi.string().required()
    }),
}

module.exports = {
    validateParam,
    validateBody,
    schemas
}