import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
//Accepts JSON data (like { "name": "Sarthak" })
//Restricts body size to 16kb for security

app.use(express.urlencoded({extended:true},{limit:"16kb"}))
// Accepts HTML form data (like username=sarthak)
// extended: true allows nested objects
// Limit again is 16kb
app.use(express.static("public"))
// Serves static files like CSS, JS, images from public folder

app.use(cookieParser())
// Parses cookies from incoming requests and attaches to req.cookies

//routes imports

import userRouter from './routes/user.routes.js'
//mann chah naam tabhi de skte jab export default hora ho
//exported router get assigned userRouter variable and value is alloted dynamically on import time for once




//router declaration

// app.use("/users",userRouter)
//general practice is :
app.use("/api/v1/users",userRouter)
// This means all user-related routes will start with /api/v1/users.  ->go to user.routes.js



//http://localhost:5000/users/register


export { app }