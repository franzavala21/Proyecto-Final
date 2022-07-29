require("dotenv").config()
require("./data/config")
const express = require("express")
const server = express()
const port = process.env.port
const hbs = require("express-handlebars")
const path = require("path")


server.use(express.json()) //me indica que puedo trabajar con archivos.json
server.use(express.urlencoded({ extended: true }))

//bootstrap
server.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
server.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))



//Handlebars
server.set("view engine", "hbs")
server.set("views", path.join(__dirname, "views"))
server.engine("hbs", hbs.engine({ extname: "hbs"}))

server.get("/", (req,res) => {
    const content = `
    <h2>Server with Express<h2>
    <pre>First test with Node and Express </pre>`

    res.send(content)
})


server.use("/users", require("./users/userRouter"))
server.use("/posts", require("./house/houseRouter"))


//catch all route(404)
server.use((req, res, next) => {
    let error = new Error();
    error.status = 404;
    error.message = "Resource not found"
    next(error);
});

server.use((error, req, res, next) => {
    if(!error.status) {
        error.status = 500;
        error.message = "Internal Error Server"
    }

    res.status(error.status).json({status: error.status, message: error.message})
})



server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Listening in http://localhost:${port} `)
})
