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

//User can add a post with a token
const addOne = async (req, res, next) => {
    const result = await addNewHouse({userid: req.token.id, ...req.body})
    result instanceof Error ? next(result) : res.status(201).json({message: `Post added by ${req.token.name}`})
}


module.exports = {listAll, addOne}