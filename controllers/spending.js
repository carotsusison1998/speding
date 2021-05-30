const Spending = require("../models/Spending");
const Day = require("../models/Day");

const insertSpending = async (req, res, next) => {
    const checkDay = await Day.findOne({"name_date": req.value.body.date});
    if(checkDay === null){
        // insert date trước
        const objectDate = {
            name_date: req.value.body.date,
            total_price: req.value.body.price,
            id_user: req.value.body.id_user
        }
        const newDay = new Day(objectDate);
        await newDay.collection.dropIndexes("day.email_1");
        newDay.save().then( async (date)=>{
            const objectSpending = {
                name: req.value.body.name,
                price: req.value.body.price,
                note: req.value.body.note,
                date: req.value.body.date,
                id_user: req.value.body.id_user,
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
        const userUpdate = await Day.findByIdAndUpdate(checkDay._id, {total_price:  Number(checkDay.total_price) + Number(req.value.body.price)});
        if(userUpdate){
            const objectSpending = {
                name: req.value.body.name,
                price: req.value.body.price,
                note: req.value.body.note,
                date: req.value.body.date,
                id_user: req.value.body.id_user,
                id_day: checkDay._id
            }
            const newSpending = new Spending(objectSpending);
            await newSpending.collection.dropIndexes("spendings.email_1");
            newSpending.save().then((user)=>{
                return res.status(200).json({ 
                    "status": true,
                    "message": "thêm chi tiêu thành công trong cái cũ",
                    "result": objectSpending
                });
            }).catch((err) => next(err))
        }
    }
};
const updateSpending = async (req, res, next) => {
    const spendingDetail = await Spending.findById({"_id": req.value.body._id});
    if(Number(spendingDetail.price) !== Number(req.value.body.price)){
        const checkDay = await Day.findById({"_id": spendingDetail.id_day});
        if(Number(req.value.body.price) > Number(spendingDetail.price)){
            const dayUpdate = await Day.findByIdAndUpdate(checkDay._id, {total_price:  Number(checkDay.total_price) + (Number(req.value.body.price) - Number(spendingDetail.price))});
        }else{
            const dayUpdate = await Day.findByIdAndUpdate(checkDay._id, {total_price:  Number(checkDay.total_price) - (Number(spendingDetail.price) - Number(req.value.body.price))});
        }
        await Spending.findByIdAndUpdate(req.value.body._id, req.value.body);
    }else{
        await Spending.findByIdAndUpdate(req.value.body._id, req.value.body);
    }
    const spendingDetailAfter = await Spending.findById({"_id": req.value.body._id});
    const checkDayAfter = await Day.findById({"_id": spendingDetail.id_day});
    return res.status(200).json({
        "status": true,
        "result": spendingDetailAfter,
        "result_2": checkDayAfter
    });
}
const detailSpending = async (req, res, next) => {
    const spendingDetail = await Spending.findById({"_id": req.body._id});
    return res.status(200).json({
        "status": true,
        "result": spendingDetail
    })
}
module.exports = {
    insertSpending,
    updateSpending,
    detailSpending,
};
