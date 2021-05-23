const Spending = require("../models/Spending");
const Day = require("../models/Day");

const insertSpending = async (req, res, next) => {
    const checkDay = await Day.findOne({"name_date": req.body.date});
    if(checkDay === null){
        // insert date trước
        const objectDate = {
            name_date: req.body.date,
            total_price: req.body.price,
            id_user: req.body.id_user
        }
        const newDay = new Day(objectDate);
        await newDay.collection.dropIndexes("day.email_1");
        newDay.save().then( async (date)=>{
            const objectSpending = {
                name: req.body.name,
                price: req.body.price,
                note: req.body.note,
                date: req.body.date,
                id_user: req.body.id_user,
                id_day: date._id
            }
            const newSpending = new Spending(objectSpending);
            await newSpending.collection.dropIndexes("spendings.email_1");
            newSpending.save().then((user)=>{
                return res.status(200).json({ 
                    "status": true,
                    "message": "thêm chi tiêu thành công",
                    "result": objectSpending
                });
            }).catch((err) => next(err))
        }).catch((err) => next(err))
    }else{
        const userUpdate = await Day.findByIdAndUpdate(checkDay._id, {total_price:  Number(checkDay.total_price) + Number(req.body.price)});
        if(userUpdate){
            const objectSpending = {
                name: req.body.name,
                price: req.body.price,
                note: req.body.note,
                date: req.body.date,
                id_user: req.body.id_user,
                id_day: checkDay._id
            }
            const newSpending = new Spending(objectSpending);
            await newSpending.collection.dropIndexes("spendings.email_1");
            newSpending.save().then((user)=>{
                return res.status(200).json({ 
                    "status": true,
                    "message": "thêm chi tiêu thành công",
                    "result": objectSpending
                });
            }).catch((err) => next(err))
        }
    }
};
module.exports = {
    insertSpending,
};
