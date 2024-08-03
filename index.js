const express = require('express')
const connection = require("./db")
const MovieRouter = require("./Routes/movieRoute")
require('dotenv').config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.use("/movies",MovieRouter)

app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`Express Server is Running on PORT ${PORT} and also connected DB`)
    } catch (error) {
        console.log(error)
    }
})
