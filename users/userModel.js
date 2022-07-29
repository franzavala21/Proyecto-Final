const pool = require("../data/config")

const getAll = () => {
    const query = `SELECT * FROM user`
    try{
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const getUserById = async(id) => {
    const query = `SELECT * FROM user WHERE id = ${id} LIMIT 1`
    try{
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const editByID = async(id, inmueble) => {
    const query = `UPDATE user SET ? WHERE id = ${id}`
    try{
        return await pool.query(query, inmueble)
    } catch (error) {
        return { "error": error.message }
    }

}

const deleteByID = async(id) => {
    const query = `DELETE FROM user WHERE id = ${id}`
    try{
        return pool.query(query)
    } catch (error) {
        return { "error": error.message }

    }
    
}

const registerUser = async(user) => {
    const query = `INSERT INTO user SET ?`
    try{
        return await pool.query(query, user)
    } catch (error) {
        return { "error": error.message }
    }
}

const loginUser = async(error) => {
    const query = `SELECT * FROM user WHERE email = '${error}'`
    try{
        return await pool.query(query)
    } catch (error) {
        return { "error": error.message }
    }
    
    
}





module.exports = { getAll, getUserById, editByID, deleteByID, registerUser, loginUser}