const notNumber = require("../utils/notNumber")
const { getAll, getUserById, editByID, deleteByID, registerUser, loginUser } = require("./userModel")
const { hashPassword, checkPass} = require("../utils/handlePassword")
const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJWT");



const listAll = async(req, res, next) => {
    const result = await getAll()
    if (result instanceof Error) return next(result)
    result.length ? res.status(200).json(result) : next()

}

const listOne = async(req, res, next) =>{
    if(notNumber(req.params.id, res)) return;
    const result = await getUserById(Number(req.params.id));
    if(result instanceof Error) return next(result);
    result.length ? res.status(200).json(result) : next()

    
}

const editOne = async(req, res, next) => {
    if(notNumber(req.params.id, res)) return;
    const result = await editByID(+req.params.id, req.body);
    if(result instanceof Error) return next(result)
    result.affectedRows ? res.status(200).json(req.body) : next()
}


const deleteId = async(req, res, next) => {
    if (notNumber(req.params.id, res)) return;
    const result = await deleteByID(Number(req.params.id));
    console.log(result)
    if(result instanceof Error) return next(result);
    result.affectedRows ? res.status(200).end() : next()

}

const register = async(req, res, next) =>{
    const cleanBody = matchedData(req);
    const password = await hashPassword(req.body.password)
    const result = await registerUser({ ...cleanBody, password: password})
    if (result instanceof Error) return next(result)  
    const user = {
        name: cleanBody.name,
        email: cleanBody.email,
    }
    const tokenData = {
        token: await tokenSign(user, "2h"),
        user,
    };
    
    res.status(201).json({user: req.body.name, Token_info: tokenData});
}

const login = async (req, res, next) => {
    const cleanBody = matchedData(req);
    const result = await loginUser(req.body.email)
    if(!result.length) return next()
    if(await checkPass(req.body.password, result[0].password)) {
        const user = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
        }
        const tokenData = {
            token: await tokenSign(user, "2h"),
            user,
        }
        res.status(200).json({message: `User ${user.name} Logged in`, Token_info: tokenData})
    } else {
        let error = new Error()
        error.status = 401
        error.message = "Unauthorized"
        next(error);
    }
};






module.exports = { listAll, listOne, editOne, deleteId, register, login }