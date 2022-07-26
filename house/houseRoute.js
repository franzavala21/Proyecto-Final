const router = require("express").Router();

const isAuth = require("../utils/Auth");
const { addOne, listAll } = require("./houseController");
router.get("/", listAll)
router.post("/", isAuth, addOne)