const { validatorCreateUser, validatorLoginUser, validatorPassword } = require("../validators/users")
const { listAll, listOne, register, editOne, deleteId, login, forgotPass, reset, savePass } = require("./userController")
const router = require("express").Router()

router.get("/", listAll)

router.get("/:id", listOne)

router.patch("/:id", editOne )

router.delete("/:id", deleteId)

router.post("/register", validatorCreateUser, register)

router.post("/login", validatorLoginUser, login)

router.post("/forgot-password", forgotPass)

router.get("/reset/:token", reset) 

router.post("/reset/:token",validatorPassword, savePass)


module.exports = router