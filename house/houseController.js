const { getHousesWith, getAllHouses, addNewHouse } = require("./houseModel")

const listAll = async (req, res, next) => {
    if(req.query.title){
        result = await getHousesWith(req.query.title)
    } else {
        result = await getAllHouses();
    }
    if(result instanceof Error) return next(result);
    result.lenght ? res.status(200).json(result) : next();
}


const addOne = async (req, res, next) => {
    const result = await addNewHouse({userid: req.token.id, ...req.body})
    result instanceof Error ? next(result) : res.status(201).json({message: `House added by ${req.token.name}`})
}


module.exports = {listAll, addOne}