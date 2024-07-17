const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./configs/Db")
const port =process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("this is home route");
    res.send("Hello, this is the home route!"); // Send a response to the client
});

app.listen(port, async() => {
    try{
        await connectDB;
        console.log("Server is running on port " + port);
    }
    catch(err){
        console.log(err);
    }
});