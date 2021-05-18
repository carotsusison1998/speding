const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DaySchema = new Schema({
    name:{
        type: String
    },
    total_price:{
        type: String
    },
    note:{
        type: String,
    },
    id_user:{
        type: String,
        required: true
    }

})
const Day = mongoose.model('days', DaySchema)
module.exports = Day
    
