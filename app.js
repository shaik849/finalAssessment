const express = require("express");

const app = express();

const mongoose = require("mongoose");


const morgan = require("morgan")


const env = require("dotenv").config()

const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const router = require("./Router/authRouter")
const postrouter = require("./Router/postRouter")
const commentRouter = require('./Router/commentRouter')

app.use("",router)
app.use("", postrouter)
app.use("", commentRouter)


const url = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/login`

async function main(){
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{console.log("connected.....")})
}

main().catch(err => console.log(err))


app.listen(process.env.port, ()=>{
    console.log(`Server is running on port ${process.env.port}`)
} )
