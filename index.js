const express=require("express")
const {connection} = require("./config/db")
const {userRouter} =require("./routes/User.routes")
const {noteRouter} =require("./routes/Note.route")
const{authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log("Trouble connecting to the db")
        console.log(err)
    }
    console.log(`running at ${process.env.port}`)
})