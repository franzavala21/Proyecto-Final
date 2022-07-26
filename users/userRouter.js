const { validatorCreateUser, validatorLoginUser } = require("../validators/users")
const { listAll, listOne, register, editOne, deleteId, login } = require("./userController")
const router = require("express").Router()

router.get("/", listAll)

router.get("/:id", listOne)

router.patch("/:id", editOne )

router.delete("/:id", deleteId)

router.post("/register", validatorCreateUser, register)

router.post("/login", validatorLoginUser, login)



module.exports = router