const pool = require("../data/config");

const getHousesWith = async(string) => {
    const query = `SELECT * FROM inmboliaria WHERE tipo LIKE '%${string}'`
    try{
        return await pool.query(query)
    }catch(error){
        error.message = error.code;
        return error;
    }

}

const getAllHouses = async () => {
    const query = `SELECT * from inmobiliaria`
    try{
        return await pool.query(query)
    }catch (error){
        error.message = error.code;
        return error;

    }
}

const addNewHouse = async (house) => {
    const query = "INSERT INTO inmobiliaria SET ?"
    try{
        return await pool.query(query, house);
    }catch (error){
        error.message = error.code;
        return error;

    }
}






module.exports = { getAllHouses, getHousesWith, addNewHouse}