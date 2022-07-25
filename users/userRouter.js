const { listAll, listOne, register, editOne, deleteId } = require("./userController")

const router = require("express").Router()

router.get("/", listAll)

router.get("/:id", listOne)

router.patch("/:id", editOne )

router.delete("/:id", deleteId)

router.post("/register", register)



module.exports = router