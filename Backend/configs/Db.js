const  mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;
const connectDB = mongoose.connect(db_url)

module.exports = connectDB;