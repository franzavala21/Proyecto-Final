const router = require("express").Router();

const isAuth = require("../utils/Auth");
const { validatorPost } = require("../validators/posts");
const { addOne, listAll } = require("./houseController");
router.get("/", listAll)
router.post("/", isAuth, validatorPost, addOne)

module.exports = router;