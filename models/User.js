const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    rule:{
        type: String,
        required: true
    }
    // ,
    // desk:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Deck'
    // }]

})
const User = mongoose.model('users', UserSchema)
module.exports = User
    
