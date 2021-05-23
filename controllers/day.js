const Day = require("../models/Day");
const Spending = require("../models/Spending");

const insertDay = async (req, res, next) => {
    
    // return res.status(200).json({ 
    //     "status": true,
    //     "result": new Date(Date.now("23/5/2021")).toLocaleString().split(',')[0]
    // });
    // const newDay = new Day(req.body);
    // await newDay.collection.dropIndexes("day.email_1");
    // newDay.save().then((user)=>{
    //     return res.status(200).json({ 
    //         "status": true,
    //         "message": "thêm chi tiêu thành công",
    //         "result": req.body
    //     });
    // }).catch((err) => next(err))
};
const getDay = async (req, res, next) => {
    const getAllDay = await Day.find({});
    return res.status(200).json({ 
        "status": true,
        "result": getAllDay
    });
};

const getSpendingOfDay = async (req, res, next) => {
    const getOfDay = await Spending.find({id_day: req.body.id_day});
    return res.status(200).json({ 
        "status": true,
        "message": "lấy chi tiêu thành công",
        "result": getOfDay
    });
}

module.exports = {
  insertDay,
  getDay,
  getSpendingOfDay
};
