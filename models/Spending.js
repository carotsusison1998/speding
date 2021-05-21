const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SpendingSchema = new Schema({
    name:{
        type: String
    },
    price:{
        type: String
    },
    note:{
        type: String,
    },
    date:{
        type: String,
    },
    id_day:{
        type: String,
        required: true
    },
    id_user:{
        type: String,
        required: true
    }

})
const Spending = mongoose.model('spending', SpendingSchema)
module.exports = Spending
    
