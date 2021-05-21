const Spending = require("../models/Spending");
const Day = require("../models/Day");

const insertSpending = async (req, res, next) => {
    
    const day = await Day.findOne({"_id": req.body.id_day});

    Day.findOneAndUpdate({_id: req.body.id_day}, {$set:{total_price:  Number(day.total_price) + Number(req.body.price) }}, {upsert: true, new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });
    const newSpending = new Spending(req.body);
    await newSpending.collection.dropIndexes("spendings.email_1");
    newSpending.save().then((user)=>{
        return res.status(200).json({ 
            "status": true,
            "message": "thêm chi tiêu thành công",
            "result": req.body
        });
    }).catch((err) => next(err))
};
module.exports = {
    insertSpending,
};
