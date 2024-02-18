const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
// Import the functions you need from the SDKs you need

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connection Successfully");
}).catch((err) =>{
    console.log(err.message)
})



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on PORT ${process.env.PORT}`);
})



