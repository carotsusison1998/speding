const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DaySchema = new Schema({
    name_date:{
        type: String
    },
    total_price:{
        type: String
    },
    id_user:{
        type: String,
        required: true
    }

})
const Day = mongoose.model('days', DaySchema)
module.exports = Day
    
