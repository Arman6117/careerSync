import express, { Application,Request,Response } from 'express'

const app:Application = express();
const PORT = process.env.PORT || 5000

//!Middleware
app.use(express.json())

//!Routes
app.get("/", (req:Request,res:Response)=> {
    res.send("Typescript server is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
} )