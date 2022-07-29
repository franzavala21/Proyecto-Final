require("dotenv").config()
require("./data/config")
const express = require("express")
const server = express()
const port = process.env.port || 8000

server.use(express.json()) //me indica que puedo trabajar con archivos.json
server.use(express.urlencoded({ extended: true }))


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
