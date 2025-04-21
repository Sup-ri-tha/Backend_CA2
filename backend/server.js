const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoute')
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.port
const url = process.env.db_url

const connectDB = async() => {
    try{
        await mongoose.connect(url)
        console.log("Connected to database successfully!")
    }
    catch(err){
        console.log("Error : ", err.message)
    }
}

connectDB();

app.get('/', (req, res) => {
    res.send("Welcome to Home Page")
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`The server is running successfully on http://localhost:${PORT}`)
})