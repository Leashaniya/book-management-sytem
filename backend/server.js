const mongoose = require("mongoose");
const cors=require("cors");
const express=require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const app= express();  

const PORT =process.env.PORT || 8000;
app.listen(PORT,() =>{
    console.log("server is up and running on port")
});

const URL=process.env.MONGODB_URL;
mongoose.connect(URL,);

const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connection success")
});

app.use(cors());
app.use(bodyParser.json());


const bookRouter=require("./routes/Book.route");
app.use("/book",bookRouter)

const userRouter=require("./routes/User.route");
app.use("/user",userRouter)