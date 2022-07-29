const notNumber = require("../utils/notNumber")
const { getAll, getUserById, editByID, deleteByID, registerUser, loginUser } = require("./userModel")
const { hashPassword, checkPass} = require("../utils/handlePassword")
const { matchedData } = require("express-validator");
const { tokenSign, tokenVerify } = require("../utils/handleJWT");
const url = process.env.url
const nodemailer = require("nodemailer")



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
    if(!result.length) return next();
    if(await checkPass(req.body.password, result[0].password)) {
    
        const user = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
        }
        const tokenData = {
            token: await tokenSign(user, "40s"),
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

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user_mailtrap,
      pass: process.env.pass_mailtrap
    }
  });


const forgotPass = async (req, res, next) => {
    const result = await loginUser(req.body.email)
    if (!result.length) return next()
    const user = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
    }
    const token = await tokenSign(user, "20m")
    const link = `${process.env.url}users/reset/${token}`

    const mailSend = {
        from: "recover-ur-password@tech.com",
        to: user.email,
        subject: "Password recovery",
        html: `
        <h2>Password Recovery Service</h2>
        <p>To reset your password, click on the link</p>
        <a href="${link}">Click to recover your password</a>`

    }
    transport.sendMail(mailSend, (err, data) => {
        if (err) return next(err)
        res.status(200).json({ message: `${user.name}, a password recovery has been sent to ${user.email}. You´ve got 15 minutes to reset it`})
    })
    

}


const resetPass = async(req, res, next) => {
    const token = req.params.token
    const tokenStatus = await tokenVerify(req.params.token)
    if(tokenStatus instanceof Error) {
        res.status(403).json({ message: "Invalid or Expired Token"})
    } else {
        res.render("reset", { token, tokenStatus})
    }



}






module.exports = { listAll, listOne, editOne, deleteId, register, login, forgotPass, resetPass }