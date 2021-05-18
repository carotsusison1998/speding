const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const securityApp = require('helmet')

// setup connect mongodb by mongo
mongoose.connect('mongodb+srv://admin:admin123@cluster0.51c2x.mongodb.net/db_spending', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  
    })
    .then(()=>{
        console.log('connected sucessfully db db_spending');
    }).catch((err)=>{
        console.log(`connecte db error ${err} `);
    })

const app = express();
app.use(securityApp());


const usersRoute = require('./routes/user');
const daysRoute = require('./routes/day');


// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use('/users', usersRoute);
app.use('/days', daysRoute);

// routes
app.get('/', (req, res, next)=>{
    return res.status(200).json({
        message: 'server is ok!'
    })
})
// cacth 
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// error
app.use((err, req, res, next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    //res to client
    return res.status(status).json({
        error:{
            message: error.message
        }
    })
})
// start server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})