const Day = require("../models/Day");

const insertDay = async (req, res, next) => {
    const newDay = new Day(req.body);
    await newDay.collection.dropIndexes("day.email_1");
    newDay.save().then((user)=>{
        return res.status(200).json({ 
            "status": true,
            "message": "thêm chi tiêu thành công",
            "result": req.body
        });
    }).catch((err) => next(err))
};

module.exports = {
  insertDay,
};
